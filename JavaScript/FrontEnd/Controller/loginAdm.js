async function loginAdmin(e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;
    const btn = document.querySelector(".btn");

    btn.disabled = true;
    btn.textContent = "Entrando...";

    try {
        const response = await fetch("https://clothean-g1s8.onrender.com/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, senha })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Erro ao fazer login.");
        }

        localStorage.setItem("adminLogado", JSON.stringify(data.usuario));
        alert(data.mensagem);
    } catch (error) {
        alert(error.message);
    } finally {
        btn.disabled = false;
        btn.textContent = "Entrar";
    }
}
