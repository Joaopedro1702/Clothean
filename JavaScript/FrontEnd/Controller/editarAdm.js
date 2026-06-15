// Pegar o id da linha do aluno
// Colocar o id no fetch

const btnEditarModal = document.getElementById("btnEditar")
const tabelaUsuario = document.getElementById("CorpoTabela")

tabelaUsuario.addEventListener("click", (e) =>
    editarUsuario(e)
)

function editarUsuarios() {

    const txtNovoNome = document.getElementById("nome").value.trim();
    const txtNovoEmail = document.getElementById("novoEmail").value.trim();
    const txtNovoCpf = document.getElementById("novoCPF").value.trim();
    const txtNovoTelefone = document.getElementById("novoCPF").value.trim();
    const txtNovoTrabalho = parseFloat(document.getElementById("notaTrabalho").value.trim());
    const media = calcularMedia(txtNovoTrabalho, txtNovaProva)

    console.log(txtNovoNome)
    console.log(txtNovoTrabalho)
    console.log(txtNovaProva)
    console.log(media)    

    if (isNull(txtNovoNome) === true) {
        mensagemErro("Todos os campos precisam estar preenchidos!");
    }
    else if (validarCpf(txtNovaProva) === false || validarNota(txtNovoTrabalho) === false) {
        mensagemErro("Nota inválida!");
    }
    else {
        const id = btnEditarModal.dataset.idUsuarioAtual;
        console.log(id)
        
        fetch(`http://localhost:3000/alunos/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome: txtNovoNome,
                notaTrabalho: txtNovoTrabalho,
                notaProva: txtNovaProva,
                media: media
            })
        })
            .then(response => response.json())
            .then(dados => {
                // Se o servidor deletou com sucesso, remove a linha da tela na hora
                mensagemSucesso("Aluno Editado!");
                consultaAluno()
            })
            .catch(erro => {
                console.log(erro);
            });
    }
};


btnEditarModal.addEventListener("click", editarUsuarios);

