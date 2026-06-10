function isNull(valor) {
    if (valor === "") {
        return true;
    }
    else {
        return false;
    }
}

function validarEmail(email) {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[a-z^\s@]{2,}$/i;

    if (!regexEmail.test(email)) {
        return false;
    }
    else {
        return true;
    }
}

function validarLetraMaiuscula(senha) {
    const regexLetraMaiuscula = /.*[A-Z]/;

    if (!regexLetraMaiuscula.test(senha)) {
        return false;
    }
    else {
        return true;
    }
}

function validarNumero(senha) {
    const regexNumero = /.*[0-9]/;

    if (!regexNumero.test(senha)) {
        return false;
    }
    else {
        return true;
    }
}

function validarCaractereEspecial(senha) {
    const regexCaractereEspecial = /.*[@_-]/;

    if (!regexCaractereEspecial.test(senha)) {
        return false;
    }
    else {
        return true;
    }
}

function validarConfirmarSenha(senha1, senha2) {
    if (senha1 === senha2) {
        return true;
    }
    else {
        return false;
    }
}

function validarCpf(cpf) {
    if (cpf.length < 14) {
        return false;
    }
    else {
        return true;
    }
}

function validarTelefone(telefone) {
    if (telefone.length < 15) {
        return false;
    }
    else {
        return true;
    }
}