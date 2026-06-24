
const express = require("express");
const router = express.Router();
const controllerBack = require("../Services/controllerService")
const validation = require("../Validations/validation")

// Rotas Usuário Comum:
router.get("/usuarios", controllerBack.listar);
router.post("/usuarios/login", validation.validarLogin, controllerBack.login);
router.post("/usuarios", validation.validarUsuario, controllerBack.cadastrar);
router.get("/usuarios/:id", controllerBack.listarId);
router.delete("/usuarios/:id", controllerBack.excluir);
router.put("/usuarios/:id", controllerBack.editar);


// Rotas ADM:
router.put("/adm/:id", controllerBack.editarAdm)
router.delete("/adm/:id", controllerBack.excluir)
router.post("/adm/login", validation.validarLogin, controllerBack.login);



module.exports = router;
