
const express = require("express");
const router = express.Router();
const controllerBack = require("../BackEnd/Services/controllerService")
const validation = require("../BackEnd/Validations/validation")


router.get("/usuarios", controllerBack.listar);
router.post("/usuarios", validation.validarUsuario, controllerBack.cadastrar);
router.delete("/usuarios/:id", controllerBack.excluir);
router.put("/usuarios/:id", controllerBack.editar);
router.post("/usuarios/login", validation.validarLogin, controllerBack.login);

module.exports = router;
