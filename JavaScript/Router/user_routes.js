const express = require("express");
const router = express.Router();

const {db} = require("../server/firebase");

router.post("/", async (req, res) => {
    try{
        const usuario = {
            nome: req.body.nome,
            email: req.body.email,
            cpf: req.body.cpf,
            senha: req.body.senha,
            tipo: "usuario",
            criadoEm: new Date()
        }
    
    const doc = await db.collection("usuarios").add(usuario);

    res.status(201).json ({
        id: doc.id,
        ...doc.data()
        });
    }catch(erro){
        res.status(500).json({
            erro: "Erro ao cadastrar usuário"
        });
    }
});
module.exports = router;