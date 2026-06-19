async function loginAdmin(e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;
    const btn = document.getElementById("btnLogarAdm");

    if (isNull(email) === true || isNull(senha) === true) {
        mensagemErro("Todos os campos precisam estar preenchidos");
    }
    else {
        if (validarEmail(email) === false) {
            mensagemErro("Email inválido, verifique!");
        }
        else if (validarLetraMaiuscula(senha) === false) {
            mensagemErro("Senha inválida!");
        }
        else if (validarNumero(senha) === false) {
            mensagemErro("Senha inválida!");
        }
        else if (validarCaractereEspecial(senha) === false) {
            mensagemErro("Senha inválida!");
        }
        else {
            try {
                btn.disabled = true;
                btn.textContent = "Entrando...";

                const response = await fetch("http://localhost:3000/adm/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ 
                        email: email, 
                        senha: senha })
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || "Erro ao fazer login.");
                }

                localStorage.setItem("token", JSON.stringify(data.token));
                localStorage.setItem("usuarioNome", JSON.stringify(data.usuario.nome));
                localStorage.setItem("usuarioId", JSON.stringify(data.usuario.id));
                localStorage.setItem("usuarioPerfil", JSON.stringify(data.usuario.perfil));

                window.location.href = "./UsuarioAdmin.html"
            } catch (error) {
                alert(error.message);
            } finally {
                btn.disabled = false;
                btn.textContent = "Entrar";
            }
        }
    }
}

const btn = document.getElementById("btnLogarAdm");

btn.addEventListener("click", loginAdmin);