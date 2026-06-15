const BtnExcluir = document.getElementById("BtnExcluir")

BtnExcluir.addEventListener("click", function (e) {

    e.preventDefault()

    const id = BtnExcluir.dataset.id // Pegamos o Id guardado na linha

    if (id === undefined) {
        mensagemErro("Não tem nenhum Usuario cadastrado no servidor ainda!");
    }

    else {
        fetch(`http://localhost:3000/usuarios/${id}`, {
            method: "DELETE"
        })
            .then(response => response.json())
            .then(dados => {
                // Se o servidor deletou com sucesso, remove a linha da tela na hora


                const strNovoNome = document.getElementById("TxtNovoNome");
                const strNovoEmail = document.getElementById("TxtNovoEmail");
                const strNovoCpf = document.getElementById("TxtNovoCpf");
                const strNovoTelefone = document.getElementById("TxtNovoTelefone");
                const strNovaSenha = document.getElementById("TxtSenha");
                const strPerfil = document.getElementById("TxtPerfil");

                clear(strNovoNome)
                clear(strNovoEmail)
                clear(strNovoCpf)
                clear(strNovoTelefone)
                clear(strNovaSenha)
                clear(strPerfil)

                mensagemSucesso("Aluno removido!");
            })
            .catch(erro => {
                console.log(erro);
            });
    };
});

