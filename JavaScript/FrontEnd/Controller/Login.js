// Quando logar, direcionar para a index e adicionar um ícone de usuário na header, que direcionaria para a tela de usuário, onde teria as informações de usuário e a possibilidade de alterar ele

function logar(event) {
    event.preventDefault()

    const txtEmail = document.getElementById("txtEmail").value;
    const txtSenha = document.getElementById("txtSenha").value;

    if (isNull(txtEmail) === true || isNull(txtSenha) === true) {
        mensagemErro("Todos os campos precisam estar preenchidos");
    }
    else {
        if (validarEmail(txtEmail) === false) {
            console.log(txtEmail)
            mensagemErro("Email inválido, verifique!");
        }
        else if (validarLetraMaiuscula(txtSenha) === false) {
            mensagemErro("Senha inválida!");
        }
        else if (validarNumero(txtSenha) === false) {
            mensagemErro("Senha inválida!");
        }
        else if (validarCaractereEspecial(txtSenha) === false) {
            mensagemErro("Senha inválida!");
        }
        else {
            fetch("https://clothean-g1s8.onrender.com/usuarios/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: txtEmail,
                    senha: txtSenha
                })

            })
                .then(response => {

                    if (!response.ok) {
                        return response.json().then(err => {
                            throw err;
                        });
                    }
                    return response.json()
                })
                .then(dados => {
                    localStorage.setItem("token", dados.token);
                    localStorage.setItem("usuarioNome", dados.usuario.nome);
                    localStorage.setItem("usuarioId", dados.usuario.id);

                    mensagemSucesso("Usuario Logado com sucesso! Seja bem-vindo " + dados.usuario.nome + "!"); // Mostra a mensagem

                    setTimeout(() => {
                        if (dados.usuario.perfil === "Usuario") {
                            window.location.href = "../../../HTML/UsuarioLogin.html"
                        }
                        else if (dados.usuario.perfil === "Admin") {
                            window.location.href = "../../../HTML/UsuarioAdmin.html"
                        }
                    }, 2000);
                })

                .catch(erro => {
                    mensagemErro(erro.mensagem);
                });
        }
    }
}

function clearLogin() {
    const txtEmail = document.getElementById("floatingInput");
    const txtSenha = document.getElementById("floatingPassword");

    clear(txtEmail);
    clear(txtSenha);
}

const botaoLogar = document.getElementById("BtnLogar");

botaoLogar.addEventListener("click", logar);


// ============ AÇÃO OLHO ===========

// === LOGIN ===
const btnImgOlhoFechadoLogin = document.getElementById("ImgOlhoFechadoS")
const btnImgOlhoAbertoLogin = document.getElementById("ImgOlhoAbertoS")
const TxtSenhaLogin = document.getElementById("txtSenha")

// Mostrar Senha:
btnImgOlhoAbertoLogin.addEventListener("click", function () {
    esconderSenha(btnImgOlhoAbertoLogin);
    alterarTipoSenhaTexto(TxtSenhaLogin);
    mostrarSenha(btnImgOlhoFechadoLogin);
})
// Ocultar Senha:
btnImgOlhoFechadoLogin.addEventListener("click", function () {
    esconderSenha(btnImgOlhoFechadoLogin);
    alterarTipoSenhaOculto(TxtSenhaLogin);
    mostrarSenha(btnImgOlhoAbertoLogin);
})

/*document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    const perfil = localStorage.getItem("usuarioPerfil");

    // Se não tiver token OU o perfil não for de administrador, expulsa o usuário
    if (!token || perfil === "Admin") {
        alert("Acesso negado! Esta área é exclusiva para o Usuário.");
        window.location.href = "login.html"; // Chuta de volta pro login
    }
});*/