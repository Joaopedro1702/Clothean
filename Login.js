function logar(event) {
    event.preventDefault()
    let strEmail = document.getElementById("floatingInput").value.trim();
    let strSenha = document.getElementById("floatingPassword").value.trim();
    const regexEmail = /^[^\s@]+@[^\s@]+\.[a-z^\s@]{2,}$/i;
    const regexLetraMaiscula = /.*[A-Z]/;
    const regexNumero = /.*[0-9]/;
    const regexCaractereEspecial = /.*[@_-]/;

    if (strEmail === "" || strSenha === "" ) {
            
        Swal.fire("Erro", "Todos os campos precisam estar preenchidos", "error");
    }
    else {
        if (!regexEmail.test(strEmail)) {
            Swal.fire("Erro", "Email inválido, verifique", "error")
        }
        else if (!regexLetraMaiscula.test(strSenha)) {
            Swal.fire("Erro", "Senha inválida, verifique se tem alguma letra maiúscula!", "error")
        }
        else if (!regexNumero.test(strSenha)) {
            Swal.fire("Erro", "Senha inválida, verifique se tem algum número!", "error")
        }
        else if (!regexCaractereEspecial.test(strSenha)) {
            Swal.fire("Erro", "Senha inválida, verifique se tem algum caractere especial!", "error")
        }
        else {
            Swal.fire({
                title: "Sucesso",
                text: "Seja bem-vindo!", 
                icon: "success"});
            }
            clear();
        }

    }


function clear() {
    document.getElementById("TxtNome").value = "";
    document.getElementById("TxtEmail").value = "";
    document.getElementById("TxtCpf").value = "";
    document.getElementById("TxtTelefone").value = "";
    document.getElementById("TxtSenha").value = "";
    document.getElementById("TxtConfSenha").value = "";
}

const botaoLogar = document.getElementById("BtnLogar");
const txtEmail = document.getElementById("floatingInput");
const txtSenha = document.getElementById("floatingPassword");
const btnImgOlhoFechado = document.getElementById("ImgOlhoFechadoS")
const btnImgOlhoAberto = document.getElementById("ImgOlhoAbertoS")

botaoLogar.addEventListener("click", logar);

btnImgOlhoAberto.addEventListener("click", function () {
    btnImgOlhoAberto.style.display = "none"

    txtSenha.type = "text"

    btnImgOlhoFechado.style.display = "block"
})

btnImgOlhoFechado.addEventListener("click", function () {
    btnImgOlhoFechado.style.display = "none"

    txtSenha.type = "password";

    btnImgOlhoAberto.style.display = "block"
})