function mudarLayoutLogin(btnLoginusuario, btnUsuarioNormal, btnLoginAdmin, btnUsuarioAdmin, estaLogado, perfil) {

   if (estaLogado === true) {
        // Esconde sempre os botões de login inicial
        btnLoginusuario.classList.add("esconder");
        btnLoginusuario.classList.remove("mostrar");
        btnLoginAdmin.classList.add("esconder");
        btnLoginAdmin.classList.remove("mostrar");

        if (perfil === "admin" || perfil === "adm") {
            // Mostra a conta do administrador e garante que a do usuário comum fica oculta
            btnUsuarioAdmin.classList.add("mostrar");
            btnUsuarioAdmin.classList.remove("esconder");
            
            btnLoginAdmin.classList.add("esconder");
            btnLoginAdmin.classList.remove("mostrar");
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
        loginUsuario.classList.add("mostrar");
        loginUsuario.classList.remove("esconder");
        loginAdmin.classList.add("mostrar");
        loginAdmin.classList.remove("esconder");

        contaUsuario.classList.add("esconder");
        contaUsuario.classList.remove("mostrar");
        contaAdmin.classList.add("esconder");
        contaAdmin.classList.remove("mostrar");
    }
}