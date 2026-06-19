document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    const perfil = localStorage.getItem("usuarioPerfil");

    // Se não tiver token OU o perfil não for de administrador, expulsa o usuário
    if (!token || perfil === "Admin") {
        alert("Acesso negado! Esta área é exclusiva para o Usuário.");
        window.location.href = "login.html"; // Chuta de volta pro login
    }
});