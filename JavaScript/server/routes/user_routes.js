const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');

const db = require("../../BackEnd/DataBase/conexao");
const { verificarToken } = require("../../middleware/autorizacao");
const jwt = require('jsonwebtoken');

router.post("/login", async (req, res) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ error: "Informe email e senha." });
        }

        const [usuarios] = await db.query(
            "SELECT id, nome, email, senha, perfil FROM tbl_Usuario WHERE email = ?",
            [email]
        );

        if (usuarios.length === 0) {
            return res.status(401).json({ error: "Email ou senha incorretos." });
        }

        const senhaValida = await bcrypt.compare(senha, usuarios[0].senha);
        if (!senhaValida) {
            return res.status(401).json({ error: "Email ou senha incorretos." });
        }

        const token = jwt.sign(
            { id: usuarios[0].id, email: usuarios[0].email, perfil: usuarios[0].perfil },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({
            mensagem: "Login realizado com sucesso.",
            token,
            usuario: { id: usuarios[0].id, nome: usuarios[0].nome, email: usuarios[0].email, perfil: usuarios[0].perfil }
        });
    } catch (error) {
        console.error("Erro ao fazer login:", error);
        res.status(500).json({ error: "Erro ao fazer login." });
    }  
})

router.get("/", verificarToken, async (req, res) => {
  try {
    const [usuarios] = await db.query(
      "SELECT id, nome, email, cpf, telefone, perfil FROM tbl_Usuario"
    );

    if (usuarios.length === 0) {
      return res.json({ mensagem: "Nenhum usuario encontrado." });
    }

    res.json(usuarios);
  } catch (error) {
    console.error("Erro ao buscar usuarios:", error);
    res.status(500).json({ error: "Erro ao buscar usuarios." });
  }
});

async function cadastrarUsuario(req, res) {
  try {
    const { nome, email, cpf, telefone, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({
        error: "Informe nome, email e senha."
      });
    }

    const [usuarioExistente] = await db.query(
      "SELECT id FROM tbl_Usuario WHERE email = ?",
      [email]
    );

    if (usuarioExistente.length > 0) {
      return res.status(409).json({
        error: "Este email ja esta cadastrado."
      });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const [resultado] = await db.query(
      "INSERT INTO tbl_Usuario (nome, email, cpf, telefone, senha, perfil) VALUES (?, ?, ?, ?, ?, ?)",
      [nome, email, cpf || null, telefone || null, senhaCriptografada, "cliente"]
    );

    res.status(201).json({
      mensagem: "Usuario cadastrado com sucesso.",
      usuario: {
        id: resultado.insertId,
        nome,
        email,
        cpf: cpf || null,
        telefone: telefone || null,
        perfil: "cliente"
      }
    });
  } catch (error) {
    console.error("Erro ao cadastrar usuario:", error);
    res.status(500).json({ error: "Erro ao cadastrar usuario." });
  }
}

router.put("/:id", verificarToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, email, cpf, telefone, senha, perfil } = req.body;

        const campos = [];
        const valores = [];

        if (nome) { campos.push("nome = ?"); valores.push(nome); }
        if (email) { campos.push("email = ?"); valores.push(email); }
        if (cpf) { campos.push("cpf = ?"); valores.push(cpf); }
        if (telefone) { campos.push("telefone = ?"); valores.push(telefone); }
        if (perfil) { campos.push("perfil = ?"); valores.push(perfil); }
        if (senha) {
            const senhaCriptografada = await bcrypt.hash(senha, 10);
            campos.push("senha = ?");
            valores.push(senhaCriptografada);
        }

        if (campos.length === 0) {
            return res.status(400).json({ error: "Nenhum campo para atualizar foi enviado." });
        }

        valores.push(id);
        const [resultado] = await db.query(
            `UPDATE tbl_Usuario SET ${campos.join(", ")} WHERE id = ?`,
            valores
        );

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ error: "Usuario nao encontrado." });
        }

        res.json({ mensagem: "Usuario atualizado com sucesso." });
    } catch (error) {
        console.error("Erro ao editar usuario:", error);
        res.status(500).json({ error: "Erro ao editar usuario." });
    }
});

router.post("/", cadastrarUsuario);
router.post("/cadastro", cadastrarUsuario);

router.delete("/:id", verificarToken, async (req, res) => {
  try {
    const { id } = req.params;

    const [resultado] = await db.query(
      "DELETE FROM tbl_Usuario WHERE id = ?",
      [id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ error: "Usuario nao encontrado." });
    }

    res.json({ mensagem: "Conta excluida com sucesso." });
  } catch (error) {
    console.error("Erro ao excluir usuario:", error);
    res.status(500).json({ error: "Erro ao excluir usuario." });
  }
});

module.exports = router;
