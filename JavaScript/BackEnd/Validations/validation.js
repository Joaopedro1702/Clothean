const fs = require("fs");
const { join } = require("path");

exports.validarUsuario = (req, res, next) => {

    const regexEmail = /^[^\s@]+@[^\s@]+\.[a-z^\s@]{2,}$/i;

    const regexLetraMaiuscula = /.*[A-Z]/;

    const regexNumero = /.*[0-9]/;

    const regexCaractereEspecial = /.*[@_-]/;


    const { nome, email, cpf, telefone, senha } = req.body;

    // valida nome
    if (!nome || nome.trim() === "") {
        return res.status(400).json({
            erro: "Nome inválido!"
        });
    }

    // valida nota trabalho
    if (regexEmail.test(email) === false) {
        return res.status(400).json({
            erro: "Email inválido!"
        });
    }

    if (cpf.lenght < 14) {
        return res.status(400).json({
            erro: "CPF inválido!"
        });
    }

    // valida nota prova
    if (telefone.lenght < 16) {
        return res.status(400).json({
            erro: "Telefone inválido!"
        });
    }

    if (regexCaractereEspecial.test(senha) === false || regexLetraMaiuscula.test(senha) === false || regexNumero.test(senha) === false) {
        return res.status(400).json({
            erro: "Senha inválida!"
        });
    }

    next();
}

exports.validarLogin = (req, res, next) => {
     const regexEmail = /^[^\s@]+@[^\s@]+\.[a-z^\s@]{2,}$/i;

    const regexLetraMaiuscula = /.*[A-Z]/;

    const regexNumero = /.*[0-9]/;

    const regexCaractereEspecial = /.*[@_-]/;


    const { email, senha } = req.body;


    // valida nota trabalho
    if (regexEmail.test(email) === false) {
        return res.status(400).json({
            erro: "Email inválido!"
        });
    }

    if (regexCaractereEspecial.test(senha) === false || regexLetraMaiuscula.test(senha) === false || regexNumero.test(senha) === false) {
        return res.status(400).json({
            erro: "Senha inválida!"
        });
    }

    next();
}