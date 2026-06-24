function mudarLayoutLogin(btnLogin, btnUsuario, btnAdmin, estaLogado, perfil) {
    if (estaLogado) {
        btnLogin.classList.add("esconder");
        btnLogin.classList.remove("mostrar");

        if (perfil === "admin") {
            btnAdmin.classList.add("mostrar");
            btnAdmin.classList.remove("esconder");

            btnUsuario.classList.add("esconder");
            btnUsuario.classList.remove("mostrar");
        } else {
            btnUsuario.classList.add("mostrar");
            btnUsuario.classList.remove("esconder");

            btnAdmin.classList.add("esconder");
            btnAdmin.classList.remove("mostrar");
        }
    } else {
        btnLogin.classList.add("mostrar");
        btnLogin.classList.remove("esconder");

        btnUsuario.classList.add("esconder");
        btnUsuario.classList.remove("mostrar");

        btnAdmin.classList.add("esconder");
        btnAdmin.classList.remove("mostrar");
    }
}