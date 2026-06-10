
const express = require("express");
const router = express.Router();
const controllerBack = require("../../Controller/Back-End/Services/controllerService")
const validation = require("../../Validations/validation")


router.get("/usuarios", controllerBack.listar);
router.post("/usuarios", validation.validarUsuario, controllerBack.cadastrar);
router.delete("/usuarios/:id", controllerBack.excluir);
router.put("/usuarios/:id", controllerBack.editar)

module.exports = router;
