document.addEventListener("DOMContentLoaded", () => {
    const btnLoginUsuario = document.getElementById("btnLoginUsuario");
    const btnUsuario = document.getElementById("btnContaUsuario");
    const btnAdmin = document.getElementById("btnContaAdmin");
    
    if (!btnLoginUsuario || !btnUsuario || !btnAdmin){
        return;
    }

    const token = localStorage.getItem("token");
    const perfil = localStorage.getItem("usuarioPerfil");

    const estaLogado = token !== null && token !== undefined && token !== "";

    if (estaLogado) {
     const perfilNormalizado = perfil ? perfil.toLowerCase() : "";

        // Verifique se a página atual é a index.html. Se for, precisa colocar o "HTML/" na frente do caminho
        const naRaiz = !window.location.pathname.includes("/HTML/");

        btnAdmin.href = naRaiz ? "./HTML/UsuarioAdmin.html" : "./UsuarioAdmin.html";
        btnUsuario.href = naRaiz ? "./HTML/UsuarioComum.html" : "./UsuarioComum.html";
        
        // Passa os elementos mapeados e o estado de login para o layout tratar visualmente
        mudarLayoutLogin(btnLoginUsuario, btnUsuario, btnAdmin, estaLogado, perfilNormalizado);
    } else {
        // Se não estiver logado, passa falso para restaurar os botões de Login padrão
        mudarLayoutLogin(btnLoginUsuario, btnUsuario, btnAdmin, false, "");
    }
});