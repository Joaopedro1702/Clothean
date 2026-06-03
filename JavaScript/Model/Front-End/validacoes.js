function isNull(valor) {
    if (valor === "" || valor === isNaN) {
        return true
    }
    else {
        return false
    }
}

function validarEmail(email) {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[a-z^\s@]{2,}$/i;

    if (!regexEmail.test(valor)) {
        return false
    }
    else {
        return true
    }
}

function validarSenha(senha) {
    const regexLetraMaiscula = /.*[A-Z]/;
    const regexNumero = /.*[0-9]/;
    const regexCaractereEspecial = /.*[@_-]/;

    if (!regexLetraMaiscula.test(senha)) {
        return false
    }
    else if (!regexNumero.test(senha)) {
        return false
    }
    else if (!regexCaractereEspecial.test(senha)) {
        return false
    }
    else {
        return true
    }
}
