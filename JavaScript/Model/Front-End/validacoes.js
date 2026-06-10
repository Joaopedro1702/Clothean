function isNull(valor) {
    // Verifica se o valor está vazio ou indefinido.
    return valor === undefined || valor === null || valor === "";
}

function validarEmail(email) {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
    return regexEmail.test(email);
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

// Expondo funções globais para uso em scripts que não são módulos.
if (typeof window !== 'undefined') {
    window.isNull = isNull;
    window.validarEmail = validarEmail;
    window.validarSenha = validarSenha;
}
