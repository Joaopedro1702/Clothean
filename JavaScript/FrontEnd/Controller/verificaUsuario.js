document.addEventListener("DOMContentLoaded", () => {
    const btnLogin = document.getElementById("btnLogin");
    const btnUsuario = document.getElementById("btnUsuario")
    const token = localStorage.getItem("token");
    const nome = localStorage.getItem("usuarioNome");

    console.log(token)
    console.log(nome)
    console.log(btnUsuario)
    console.log(btnLogin)

    if (token !== null || token !== undefined || token !== "") {
        // Se está logado, transforma o botão no botão de perfil
        mudarLayoutLogin(btnLogin, btnUsuario, true)
    } else {
        // Se NÃO está logado, garante que ele seja o botão de login
        mudarLayoutLogin(btnLogin, btnUsuario, false)
    }
});