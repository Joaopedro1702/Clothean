function logar(event) {
    event.preventDefault()
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

botaoLogar.addEventListener("click", logar);