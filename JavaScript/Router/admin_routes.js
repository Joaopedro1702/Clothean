const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');

const db = require("./conexao");
const { verificarToken } = require("../middleware/autorizacao");

router.post("/cadastro", verificarToken,async (req, res) => {
    try {
        const { nome, email, cpf, telefone, senha } = req.body;

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        await db.query(
            `INSERT INTO tbl_Usuario (nome, email, cpf, telefone, senha, perfil)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [nome, email, cpf, telefone, senhaCriptografada, "admin"]
        );

        res.status(201).json({ mensagem: "Administrador cadastrado com sucesso." });
    } catch (error) {
        console.error("Erro ao cadastrar administrador:", error);
        res.status(500).json({ error: "Erro ao cadastrar administrador." });
    }
});


router.get("/dashboard", verificarToken, (req, res) => {
    // Responde apenas se o token JWT for válido.
    res.json({mensagem: "Bem-vindo ao dashboard de administração!"});
});

module.exports = router;
