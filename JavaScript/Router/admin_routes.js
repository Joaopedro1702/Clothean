const express = require("express");
const router = express.Router();

const db = require("./conexao");

router.post("/cadastro", async (req, res) => {
    try {
        const { nome, email, cpf, telefone, senha } = req.body;

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        await db.query(
            `INSERT INTO tbl_Usuario (nome, email, cpf, telefone, senha, tipo)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [nome, email, cpf, telefone, senhaCriptografada, "admin"]
        );

        res.status(201).json({ mensagem: "Administrador cadastrado com sucesso." });
    } catch (error) {
        console.error("Erro ao cadastrar administrador:", error);
        res.status(500).json({ error: "Erro ao cadastrar administrador." });
    }
});

module.exports = router;
