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
    const token = localStorage.getItem("token")
    const usuarioLogado = jwt_decode(token)
    const id = usuarioLogado.id

    obterUsuariosEmail(id).then((Usuario) => { // Vai pegar a lista Json obtida pelo método da model
        if (Usuario=== null) {
            mensagemErro("Não tem nenhum Usuario cadastrado no servidor ainda!");
        }
        else {
            btnEditarUsu.dataset.id = Usuario.id;
                btnExcluirUsu.dataset.id = Usuario.id;
                txtNome.value = Usuario.nome;
                txtEmail.value = Usuario.email;
                txtCPF.value = Usuario.cpf;
                txtTelefone.value = Usuario.telefone;
                txtPerfil.value = Usuario.perfil;

            dadosOriginaisUsuario = {
                nome: Usuario.nome,
                email: Usuario.email,
                cpf: Usuario.cpf,
                telefone: Usuario.telefone
            }
        }
    });
};

document.addEventListener("DOMContentLoaded", function () {
    consultaUsuario(); // chama sua função de consultar automaticamente
});