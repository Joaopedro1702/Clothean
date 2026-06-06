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
            mensagemSucesso("Login realizado com sucesso! Seja bem-vindo!");
            clearLogin();
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