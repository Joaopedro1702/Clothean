const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require("../conexao");
const jwt = require('jsonwebtoken');
const { verificarToken } = require("../middleware/autorizacao");

router.get("/", verificarToken, async (req, res) => {
    try {
        const [ListaUsuarios] = await db.query("SELECT id, email, senha, perfil FROM tbl_Usuario");

        if (ListaUsuarios.length === 0) {
            return res.json({ mensagem: "Nenhum usuário encontrado." });
        }

        res.json(ListaUsuarios);
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        res.status(500).json({ error: "Erro ao buscar usuários" });
    }
});

router.post("/", async (req, res) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ error: "Informe email e senha." });
        }

        const [usuarios] = await db.query(
            "SELECT id, nome, email, senha, perfil FROM tbl_Usuario WHERE email = ? AND perfil = ?",
            [email, "admin"]
        );

        if (usuarios.length === 0) {
            return res.status(401).json({ error: "Email ou senha de administrador incorretos." });
        }

        const senhaValida = await bcrypt.compare(senha, usuarios[0].senha);

        if (!senhaValida) {
            return res.status(401).json({ error: "Email ou senha do administrador incorretos." });
        }

        const token = jwt.sign(
            { id: usuarios[0].id, email: usuarios[0].email, perfil: usuarios[0].perfil },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            maxAge: 3600000
        });

        res.json({
            mensagem: "Login realizado com sucesso.",
            usuario: usuarios[0]
        });
    } catch (error) {
        console.error("Erro ao fazer login:", error);
        res.status(500).json({ error: "Erro ao fazer login." });
    }
});

router.delete("/", verificarToken, async (req, res) => {
    try {
        const id = req.user?.id;

        if (!id) {
            return res.status(400).json({ error: "ID de usuário não encontrado para exclusão." });
        }

        await db.query('DELETE FROM tbl_Usuario WHERE id = ?', [id]);

        res.json({ mensagem: 'Conta excluída com sucesso.' });
    } catch (error) {
        console.error("Erro ao excluir usuário:", error);
        res.status(500).json({ error: "Erro ao excluir usuário." });
    }
});

module.exports = router;
