
const express = require("express");
const router = express.Router();
const controllerBack = require("../BackEnd/Services/controllerService")
const validation = require("../BackEnd/Validations/validation")


router.get("/", controllerBack.listar);
router.post("/", validation.validarUsuario, controllerBack.cadastrar);
router.delete("/:id", controllerBack.excluir);
router.put("/:id", controllerBack.editarAdm);
router.post("/login", validation.validarLogin, controllerBack.login);

module.exports = router;
