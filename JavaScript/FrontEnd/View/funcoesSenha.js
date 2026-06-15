function mostrarSenha(elemento) {
    elemento.classList.remove("esconder")
    elemento.classList.add("mostrar");
}

function esconderSenha(elemento) {
    elemento.classList.remove("mostrar")
    elemento.classList.add("esconder");
}

function alterarTipoSenhaTexto(elemento) {
    elemento.type = "text";
}

function alterarTipoSenhaOculto(elemento) {
    elemento.type = "password";
}