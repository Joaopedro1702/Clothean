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
    const NovoPerfil = document.getElementById("opcoes");
    const TxtNovoPerfil = NovoPerfil.options[NovoPerfil.selectedIndex].text;

    if (isNull(txtNovoNome) === true || isNull(txtNovoCpf) === true || isNull(txtNovoTelefone) === true) {
        mensagemErro("Todos os campos precisam estar preenchidos!");
    }
    else if (validarCpf(txtNovoCpf) === false) {
        mensagemErro("Cpf inválido, verifique!");
    }
    else if (validarEmail(txtNovoEmail) === false) {
        mensagemErro("Email inválido, verifique!")
    }
    else if (validarTelefone(txtNovoTelefone)) {
        mensagemErro("Telefone inválido, verifique!")
    }
    else {
        const id = btnEditarModal.dataset.idUsuarioAtual;
        console.log(id)

        fetch(`${baseUrl}adm/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome: txtNovoNome,
                email: txtNovoEmail,
                cpf: txtNovoCpf,
                telefone: txtNovoTelefone,
                perfil: TxtNovoPerfil
            })
        })
            .then(response => response.json())
            .then(dados => {
                mensagemSucesso("Usuario Editado com Sucesso!");
                consultaUsuarios();
            })
            .catch(erro => {
                console.log(erro);
            });
    }
};


btnEditarModal.addEventListener("click", editarUsuarios);

const txtTelefone2 = document.getElementById("novoTelefone")

txtTelefone2.addEventListener('input', function (e) {

    let v = e.target.value.replace(/\D/g, '');

    v = v.replace(/(\d{2})(\d)/, '($1) $2')

    v = v.replace(/(\d{5})(\d{4})/, '$1-$2');

    e.target.value = v;
})

const txtCpf2 = document.getElementById("novoCPF")

txtCpf2.addEventListener('input', function (e) {

    let v = e.target.value.replace(/\D/g, '');

    v = v.replace(/(\d{3})(\d)/, '$1.$2');

    v = v.replace(/(\d{3})(\d)/, '$1.$2');

    v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2')

    e.target.value = v;
})
