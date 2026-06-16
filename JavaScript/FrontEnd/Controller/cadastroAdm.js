async function enviar(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const cpf = document.getElementById("cpf").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const senha = document.getElementById("senha").value;
    const confirmar = document.getElementById("confirmar").value;
    const errSenha = document.getElementById("err-senha");

    // Validação: campos obrigatórios
    if (!nome || !email || !cpf || !telefone || !senha || !confirmar) {
        alert("Preencha todos os campos.");
        return;
    }

    // Validação: senhas coincidem
    if (senha !== confirmar) {
        errSenha.classList.add("show");
        return;
    }
    errSenha.classList.remove("show");

    const btn = document.querySelector(".btn");
    btn.disabled = true;
    btn.textContent = "Cadastrando...";

    try {
        const response = await fetch("http://localhost:3002/admin/cadastro", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, email, cpf, telefone, senha })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Erro ao cadastrar administrador.");
        }

        alert(data.mensagem);
        // Redireciona para o login após cadastro bem-sucedido
        window.location.href = "login.html";
    } catch (error) {
        alert(error.message);
    } finally {
        btn.disabled = false;
        btn.textContent = "Cadastrar";
    }
}
