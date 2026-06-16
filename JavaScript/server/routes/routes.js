const express = require("express");
const router = express.Router();
const controllerBack = require("../controllers/controllerService");
const validation = require("../validations/validation");

router.get("/usuarios", controllerBack.listar);
router.post("/usuarios", validation.validarUsuario, controllerBack.cadastrar);
router.delete("/usuarios/:id", controllerBack.excluir);
router.put("/usuarios/:id", controllerBack.editar);
router.post("/usuarios/login", validation.validarLogin, controllerBack.login);

module.exports = router;
