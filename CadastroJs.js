// TAREFAS:
// - Função para apagar campos: OK
// - Validação para email com @gmail, pois o campo email não vai: OK
// - Colocar as mascaras para cpf e telefone: OK
// - Colocar Ver senha nos campos senha: OK
// - Colocar validação de confirmarSenha com o campo senha: OK
// - Colocar a api para mandar um email na aba contatos com um modal: OK
// - Ver tela login e comparar com cadastro: OK
// - Função para cadastrar usuários com validação de email, telefone, cpf e senha onde o campo fica verde ou vermelho: **Fazer se tiver tempo
// - Fazer um sweet alert para erros e sucesso para usuário cadastrado: OK
// - Colocar api para fazer login com o google e o facebook:
// - Colocar a api para validar o email digitado como existente: https://www.npmjs.com/package/verifalia-widget: Não obrigatório agora
// - Colocar a api para validar o cpf digitado como existente: Não obrigatório agora 


function cadastrar(event) {
    event.preventDefault()
    let strNome = document.getElementById("TxtNome").value.trim();
    let strEmail = document.getElementById("TxtEmail").value.trim();
    let strCpf = document.getElementById("TxtCpf").value.trim();
    let strTelefone = document.getElementById("TxtTelefone").value.trim();
    let strSenha = document.getElementById("TxtSenha").value.trim();
    let strConfSenha = document.getElementById("TxtConfSenha").value.trim();
    const regexEmail = /^[^\s@]+@[^\s@]+\.[a-z^\s@]{2,}$/i;
    const regexLetraMaiscula = /.*[A-Z]/;
    const regexNumero = /.*[0-9]/;
    const regexCaractereEspecial = /.*[@_-]/;

    if (strNome === "" || strEmail === "" || strCpf === "" || strTelefone === "" || strSenha === "" || strConfSenha === "") {

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
        else if (strSenha != strConfSenha) {
            Swal.fire("Erro", "As senha digitadas são diferentes uma da outra, verifique!", "error")
        }
        else if (strCpf.length < 14){
            Swal.fire("Erro", "O cpf não foi digitado corretamente, verifique!", "error")
        }
        else if (strTelefone.length < 16){
            Swal.fire("Erro", "O telefone não foi digitado corretamente, verifique", "error")
        }
        else {
            Swal.fire("Sucesso", "Usuário cadastrado com sucesso! Seja bem-vindo " + strNome + "!", "success")
            clear();
        }

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

const botaoCadastro = document.getElementById("BtnCadastrar");
const txtCpf = document.getElementById("TxtCpf");
const txtTelefone = document.getElementById("TxtTelefone")
const txtEmail = document.getElementById("TxtEmail");
const txtSenha = document.getElementById("TxtSenha")
const TxtConfSenha = document.getElementById("TxtConfSenha")
const btnImgOlhoFechadoCS = document.getElementById("ImgOlhoFechadoCS");
const btnImgOlhoAbertoCS = document.getElementById("ImgOlhoAbertoCS")
const btnImgOlhoFechado = document.getElementById("ImgOlhoFechadoS")
const btnImgOlhoAberto = document.getElementById("ImgOlhoAbertoS")

let strCpf = document.getElementById("TxtCpf").value;

botaoCadastro.addEventListener("click", cadastrar)

txtCpf.addEventListener('input', function (e) {

    let v = e.target.value.replace(/\D/g, '');

    v = v.replace(/(\d{3})(\d)/, '$1.$2');

    v = v.replace(/(\d{3})(\d)/, '$1.$2');

    v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2')

    e.target.value = v;

})

txtTelefone.addEventListener('input', function (e) {

    let v = e.target.value.replace(/\D/g, '');

    v = v.replace(/(\d{2})(\d)/, '($1) $2')

    v = v.replace(/(\d{5})(\d{4})/, '$1-$2');

    e.target.value = v;
})

btnImgOlhoFechado.addEventListener("click", function () {
    btnImgOlhoFechado.style.display = "none"

    txtSenha.type = "password"

    btnImgOlhoAberto.style.display = "block"
})

btnImgOlhoAberto.addEventListener("click", function () {
    btnImgOlhoAberto.style.display = "none"

    txtSenha.type = "text";

    btnImgOlhoFechado.style.display = "block"
})

btnImgOlhoFechadoCS.addEventListener("click", function () {
    btnImgOlhoFechadoCS.style.display = "none"

    TxtConfSenha.type = "text"

    btnImgOlhoAbertoCS.style.display = "block"
})

btnImgOlhoAbertoCS.addEventListener("click", function () {
    btnImgOlhoAbertoCS.style.display = "none"

    TxtConfSenha.type = "password"

    btnImgOlhoFechadoCS.style.display = "block"
})

