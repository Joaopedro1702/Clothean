function mudarLayoutLogin(btnLoginusuario, btnUsuarioNormal, btnUsuarioAdmin, estaLogado, perfil) {

   if (estaLogado === true) {
        // Esconde sempre os botões de login inicial
        btnLoginusuario.classList.add("esconder");
        btnLoginusuario.classList.remove("mostrar");

        if (perfil === "admin" || perfil === "adm") {
            // Mostra a conta do administrador e garante que a do usuário comum fica oculta
            btnUsuarioAdmin.classList.add("mostrar");
            btnUsuarioAdmin.classList.remove("esconder");
            
            btnLoginusuario.classList.add("esconder");
            btnLoginusuario.classList.remove("mostrar");
        } else {
            // Mostra a conta do usuário comum e garante que a do administrador fica oculta
            btnUsuarioNormal.classList.add("mostrar");
            btnUsuarioNormal.classList.remove("esconder");
            
            btnUsuarioAdmin.classList.add("esconder");
            btnUsuarioAdmin.classList.remove("mostrar");
        }
    }
    else {
        // CONSEQUÊNCIA: Se não estiver logado, exibe os logins e limpa os botões de conta de utilizador
        btnLoginusuario.classList.add("mostrar");
        btnLoginusuario.classList.remove("esconder");

        btnUsuarioNormal.classList.add("esconder");
        btnUsuarioNormal.classList.remove("mostrar");
        btnUsuarioAdmin.classList.add("esconder");
        btnUsuarioAdmin.classList.remove("mostrar");
    }
}