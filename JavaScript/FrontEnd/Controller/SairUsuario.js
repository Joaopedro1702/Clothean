function efeturarLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuarioNome");
    localStorage.removeItem("usuarioId");
    localStorage.removeItem("usuarioPerfil");

    setTimeout(() => {
       window.location.href = "./index.html"     
    }, 2000);
}

const btnSair = document.getElementById("BtnSair");
btnSair.addEventListener("click", efeturarLogout)
