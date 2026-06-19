const btnConsultarUsu = document.getElementById("BtnConsultar");
const btnEditarUsu = document.getElementById("BtnEditar");
const btnExcluirUsu = document.getElementById("BtnExcluir");

let dadosOriginaisUsuario = null;

const txtNome = document.getElementById("TxtNovoNome");
const txtEmail = document.getElementById("TxtNovoEmail");
const txtCPF = document.getElementById("TxtNovoCpf");
const txtTelefone = document.getElementById("TxtNovoTelefone");
const txtPerfil = document.getElementById("TxtPerfil");
const txtSenha2 = document.getElementById("TxtSenha");


function consultaUsuario() {

    // linhaAluno.textContent = ""; // Limpa tudo antes de adicionar os alunos do json

    obterUsuarios().then(function (listaUsuarios) { // Vai pegar a lista Json obtida pelo método da model

        if (listaUsuarios.length === 0) {
            mensagemErro("Não tem nenhum Usuario cadastrado no servidor ainda!");
        }
        else {
            listaUsuarios.forEach(function (usuario) { // Percorre a lista obtida da Model
                btnEditarUsu.dataset.id = usuario.id,
                btnExcluirUsu.dataset.id = usuario.id,
                txtNome.value = usuario.nome, 
                txtEmail.value = usuario.email, 
                txtCPF.value = usuario.cpf, 
                txtTelefone.value = usuario.telefone, 
                txtPerfil.value = usuario.perfil

                dadosOriginaisUsuario = {
                    nome: usuario.nome,
                    email: usuario.email,
                    cpf: usuario.cpf,
                    telefone: usuario.telefone
                }
            })
        }
    });
};

btnConsultarUsu.addEventListener("click", consultaUsuario)