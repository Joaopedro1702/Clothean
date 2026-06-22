const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');

const db = require("../conexao");
const { verificarToken } = require("../autorizacao");

async function permitirPrimeiroAdmin(req, res, next) {
    try {
        const [admins] = await db.query(
            "SELECT id FROM tbl_Usuario WHERE perfil = ? LIMIT 1",
            ["admin"]
        );

        if (admins.length === 0) {
            return next();
        }

        return verificarToken(req, res, next);
    } catch (error) {
        console.error("Erro ao verificar administradores:", error);
        return res.status(500).json({ error: "Erro ao verificar administradores." });
    }
}

router.post("/cadastro", permitirPrimeiroAdmin, async (req, res) => {
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
    res.json({ mensagem: "Bem-vindo ao dashboard de administração!" });
});

module.exports = router;
