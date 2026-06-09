function mostrarSenha() {
    btnImgOlhoAberto.style.display = "none"

    txtSenha.type = "text"

    btnImgOlhoFechado.style.display = "block"
}

function esconderSenha() {
    btnImgOlhoFechado.style.display = "none"

    txtSenha.type = "password";

    btnImgOlhoAberto.style.display = "block"
}