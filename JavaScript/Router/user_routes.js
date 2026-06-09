const express = require("express");
const router = express.Router();

const db = require("./conexao");
const senhaCriptografada = await bcrypt.hash(senha, 10);

router.get("/", async (req, res) => {
  try {
    const [usuarios] = await db.query(
      "SELECT id, nome, email, cpf, telefone, tipo FROM tbl_Usuario"
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

    const [resultado] = await db.query(
      "INSERT INTO tbl_Usuario (nome, email, cpf, telefone, senha, tipo) VALUES (?, ?, ?, ?, ?, ?)",
      [nome, email, cpf || null, telefone || null, senha, "cliente"]
    );

    res.status(201).json({
      mensagem: "Usuario cadastrado com sucesso.",
      usuario: {
        id: resultado.insertId,
        nome,
        email,
        cpf: cpf || null,
        telefone: telefone || null,
        tipo: "cliente"
      }
    });
  } catch (error) {
    console.error("Erro ao cadastrar usuario:", error);
    res.status(500).json({ error: "Erro ao cadastrar usuario." });
  }
}

router.post("/", cadastrarUsuario);
router.post("/cadastro", cadastrarUsuario);

router.delete("/:id", async (req, res) => {
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
