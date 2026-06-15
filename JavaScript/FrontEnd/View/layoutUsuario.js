function mudarLayoutLogin(btnLogin, btnUsuario, estaLogado) {

    if (estaLogado === true) {
        btnLogin.classList.add("esconder")
        btnLogin.classList.remove("mostrar")

        btnUsuario.classList.add("mostrar")
        btnUsuario.classList.remove("esconder")
    }
    else {
        btnLogin.classList.add("mostrar")
        btnLogin.classList.remove("esconder")

        btnUsuario.classList.add("esconder")
        btnUsuario.classList.add("mostrar")
    }
}
