let dadosOriginaisUsuario = null;

function consultaUsuarios() {

    const linhaUsuario = document.getElementById("CorpoTabela"); // Pega o corpo da tabela para dar mostrar os alunos

    linhaUsuario.innerHTML = "";

    // linhaAluno.textContent = ""; // Limpa tudo antes de adicionar os alunos do json

    obterUsuarios().then(function (listaUsuario) { // Vai pegar a lista Json obtida pelo método da model

        if (listaUsuario.length === 0) {
            mensagemErro("Não tem nenhum usuario cadastrado no servidor ainda!");
        }
        else {
            listaUsuario.forEach(function (usuario) { // Percorre a lista obtida da Model
                addInfoUsuario(usuario.id, usuario.nome, usuario.email, usuario.cpf, usuario.telefone, usuario.perfil) // Faz a linha para adicionar a tabela
            })
        }
    });
};

document.addEventListener("DOMContentLoaded", (consultaUsuarios))