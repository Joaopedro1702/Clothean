function efeturarLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuarioNome");
    localStorage.removeItem("usuarioId");
    localStorage.removeItem("usuarioPerfil");

    setTimeout(() => {
       window.location.href("./index.html")     
    }, 2000);
}