const btnEditar = document.getElementById("BtnEditar")
const txtNovoNome = document.getElementById("TxtNovoNome");
const txtNovoEmail = document.getElementById("TxtNovoEmail");
const txtNovoCPF = document.getElementById("TxtNovoCpf");
const txtNovoTelefone2 = document.getElementById("TxtNovoTelefone");
const txtNovaSenha = document.getElementById("TxtNovaSenha");

function editarUsuario() {

    const strNovoNome = document.getElementById("TxtNovoNome").value.trim()
    const strNovoEmail = document.getElementById("TxtNovoEmail").value.trim();
    const strNovoCpf = document.getElementById("TxtNovoCpf").value.trim();
    const strNovoTelefone = document.getElementById("TxtNovoTelefone").value.trim();
    const strNovaSenha = document.getElementById("TxtSenha").value.trim();
    const strPerfil = document.getElementById("TxtPerfil").value.trim();

    if (!dadosOriginaisUsuario) {
        mensagemErro("Por favor, clique em consultar antes para não colocar informações iguais")
    }
    else if (isNull(strNovoNome) === true || isNull(strNovoEmail || isNull(strNovoCpf) || isNull(strNovoTelefone) || isNull(strNovaSenha))) {
        mensagemErro("Todos os campos precisam estar preenchidos!");
    }
    else if (validarTelefone(strNovoTelefone) === false) {
        mensagemErro("Telefone inválido!");
    }
    else if (validarEmail(strNovoEmail) === false) {
        mensagemErro("Email inválido!");
    }
    else if (validarCpf(strNovoCpf) === false) {
        mensagemErro("Cpf inválido!");
    }
    else if (strNovoNome === dadosOriginaisUsuario.nome && strNovoEmail === dadosOriginaisUsuario.email && strNovoCpf === dadosOriginaisUsuario.cpf && strNovoTelefone === dadosOriginaisUsuario.telefone) {
        mensagemErro("Dados iguais aos antigos, não é necessário editar!");
    }
    else {
        const id = btnEditar.dataset.id;
        console.log(id)

        fetch(`${baseUrl}usuarios/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome: strNovoNome,
                email: strNovoEmail,
                cpf: strNovoCpf,
                telefone: strNovoTelefone,
                senha: strNovaSenha,
                perfil: strPerfil
            })
        })
            .then(response => response.json())
            .then(dados => {
                // Se o servidor deletou com sucesso, remove a linha da tela na hora
                mensagemSucesso("Usuario Editado com Sucesso!");
            })
            .catch(erro => {
                console.log(erro);
            });
    }
};

const txtNovoTelefone = document.getElementById("TxtNovoTelefone")

txtNovoTelefone.addEventListener('input', function (e) {

    let v = e.target.value.replace(/\D/g, '');

    v = v.replace(/(\d{2})(\d)/, '($1) $2')

    v = v.replace(/(\d{5})(\d{4})/, '$1-$2');

    e.target.value = v;
})

const txtNovoCpf = document.getElementById("TxtNovoCpf")

txtNovoCpf.addEventListener('input', function (e) {

    let v = e.target.value.replace(/\D/g, '');

    v = v.replace(/(\d{3})(\d)/, '$1.$2');

    v = v.replace(/(\d{3})(\d)/, '$1.$2');

    v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2')

    e.target.value = v;

})

btnEditar.addEventListener("click", editarUsuario)
