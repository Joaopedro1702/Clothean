document.addEventListener("DOMContentLoaded", () => {
    const btnLoginUsuario = document.getElementById("btnLoginUsuario");
    const btnLoginAdmin = document.getElementById("btnLoginAdmin");
    const btnContaUsuario = document.getElementById("btnContaUsuario");
    const btnContaAdmin = document.getElementById("btnContaAdmin");
    const btnSairUsuario = document.getElementById("btnSairUsuario");

    const token = localStorage.getItem("token");
    const adminLogado = localStorage.getItem("adminLogado");

    if (token) {
        esconderElemento(btnLoginUsuario);
        esconderElemento(btnLoginAdmin);
        esconderElemento(btnContaAdmin);
        mostrarElemento(btnContaUsuario);
        mostrarElemento(btnSairUsuario);
    } else if (adminLogado) {
        esconderElemento(btnLoginUsuario);
        esconderElemento(btnLoginAdmin);
        esconderElemento(btnContaUsuario);
        mostrarElemento(btnContaAdmin);
        mostrarElemento(btnSairUsuario);
    } else {
        mostrarElemento(btnLoginUsuario);
        mostrarElemento(btnLoginAdmin);
        esconderElemento(btnContaUsuario);
        esconderElemento(btnContaAdmin);
        esconderElemento(btnSairUsuario);
    }

    if (btnSairUsuario) {
        btnSairUsuario.addEventListener("click", encerrarSessao);
    }
});

function mostrarElemento(elemento) {
    if (elemento) {
        elemento.classList.remove("esconder");
    }
}

function esconderElemento(elemento) {
    if (elemento) {
        elemento.classList.add("esconder");
    }
}

function encerrarSessao() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuarioNome");
    localStorage.removeItem("usuarioId");
    localStorage.removeItem("adminLogado");

    window.location.href = "index.html";
}
