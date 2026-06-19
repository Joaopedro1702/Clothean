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
    event.preventDefault();
    let strNome = document.getElementById("TxtNome").value.trim();
    let nomeUsuario = alterandoPrimeiraLetra(strNome);
    let strEmail = document.getElementById("TxtEmail").value.trim();
    let strCpf = document.getElementById("TxtCpf").value.trim();
    let strTelefone = document.getElementById("TxtTelefone").value.trim();
    let strSenha = document.getElementById("TxtSenha").value.trim();
    let strConfSenha = document.getElementById("TxtConfSenha").value.trim();

    if (isNull(strNome) === true || isNull(strEmail) === true || isNull(strCpf) === true || isNull(strTelefone) === true || isNull(strSenha) === true || isNull(strConfSenha) === true) {
        mensagemErro("Todos os campos precisam estar preenchidos");
    }
    else {
        if (validarEmail(strEmail) === false) {
            mensagemErro("Email inválido, verifique");
        }
        else if (validarLetraMaiuscula(strSenha) === false) {
            mensagemErro("Senha inválida, verifique se tem alguma letra maiúscula!");
        }
        else if (validarNumero(strSenha) === false) {
            mensagemErro("Senha inválida, verifique se tem algum número!");
        }
        else if (validarCaractereEspecial(strSenha) === false) {
            mensagemErro("Senha inválida, verifique se tem algum caractere especial!");
        }
        else if (validarConfirmarSenha(strSenha, strConfSenha) === false) {
            mensagemErro("As senha digitadas são diferentes uma da outra, verifique!");
        }
        else if (validarCpf(strCpf) === false) {
            mensagemErro("O cpf não foi digitado corretamente, verifique!");
        }
        else if (validarTelefone(strTelefone) === false) {
            mensagemErro("O telefone não foi digitado corretamente, verifique");
        }
        else {
            fetch("http://localhost:3000/usuarios", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nome: nomeUsuario,
                    email: strEmail,
                    cpf: strCpf,
                    telefone: strTelefone,
                    senha: strSenha,
                })

            })
                .then(response => {
                    if (!response.ok) {
                        return response.json().json().then(erro => {
                            throw new Error(erro.mensagem);
                        })
                    }
                    return response.json();
                })
                .then(dados => {

                    mensagemSucesso("Usuario cadastrado com sucesso! Seja bem-vindo " + strNome + "!"); // Mostra a mensagem
                    clearCadastro();
                })
                .catch(erro => {
                    console.error("Erro na requisição de cadastro:", erro);
                mensagemErro(erro.message || "Não foi possível conectar ao servidor.");
                });

        }
    };
};

function clearCadastro() {
    const nome = document.getElementById("TxtNome");
    const email = document.getElementById("TxtEmail");
    const cpf = document.getElementById("TxtCpf");
    const telefone = document.getElementById("TxtTelefone");
    const senha = document.getElementById("TxtSenha");
    const confSenha = document.getElementById("TxtConfSenha");

    clear(nome);
    clear(email);
    clear(cpf);
    clear(telefone);
    clear(senha);
    clear(confSenha);
}

const botaoCadastro = document.getElementById("BtnCadastrar");

botaoCadastro.addEventListener("click", cadastrar);

