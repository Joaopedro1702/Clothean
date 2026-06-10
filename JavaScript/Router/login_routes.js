const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require("./conexao");
const { Connection } = require("mysql2/promise");


router.get("/", async(req, res) => {
    try{
        const [ListaUsuarios] = await db.query("SELECT id, email, senha, tipo FROM tbl_Usuario WHERE email = ?");

        if(ListaUsuarios.length === 0){
            return res.json({mensagem: "Nenhum usuário encontrado."})
        }

        res.json(ListaUsuarios);

    }catch(error){
        console.error("Erro ao buscar usuários:", error);
        res.status(500).json({error: "Erro ao buscar usuários"})
    }
});

router.post("/", async (req, res) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ error: "Informe email e senha." });
        }

        const [usuarios] = await db.query(
            "SELECT id, nome, email, senha, perfil tipo FROM tbl_Usuario WHERE email = ?",
            [email, "admin"]
        );

        if (usuarios.length === 0) {
        return res.status(401).json({ error: "Email ou senha de administrador incorretos." });
        }

        const senhaSecret = await bcrypt.compare(senha, usuarios[0].senha);

        if(!senhaSecret){
            return res.status(401).json({error: "Email ou senha do administrador incorretos."});
        }

        res.json({
            mensagem: "Login realizado com sucesso.",
            usuario: usuarios[0]
        });
    } catch (error) {
        console.error("Erro ao fazer login:", error);
        res.status(500).json({ error: "Erro ao fazer login." });
    }
});

router.delete("/", async (req, res) => {
    try{
        const id = req.user.id;
        await Connection.execute()(
            'DELETE FROM tbl_Usuario WHERE id = ?'
            [id]
        );
        res.json({mensagem: 'Conta excluída com sucesso.'})
    }catch(error){
        console.error("Erro ao excluir usuário:", error);
        res.status(500).json({error: "Erro ao excluir usuário."});
    }
})
module.exports = router;
