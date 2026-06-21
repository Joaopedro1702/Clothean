const BtnExcluir = document.getElementById("BtnExcluir")

BtnExcluir.addEventListener("click", function (e) {

    e.preventDefault()

    const id = BtnExcluir.dataset.id // Pegamos o Id guardado na linha

    if (id === undefined) {
        mensagemErro("Não tem nenhum Usuario cadastrado no servidor ainda!");
    }
    if (!dadosOriginaisUsuario) {
        mensagemErro("Por favor, clique em consultar antes para não colocar informações iguais")
    }

    else {
        fetch(`${baseUrl}usuarios/{id}`, {
            method: "DELETE"
        })
            .then(response => response.json())
            .then(dados => {
                // Se o servidor deletou com sucesso, remove a linha da tela na hora
                localStorage.removeItem("token");
                localStorage.removeItem("usuarioNome");
                localStorage.removeItem("usuarioId");
                localStorage.removeItem("usuarioPerfil");

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

                setTimeout(() => {
                    window.location.href = "./index.html"
                }, 2000);
            })
            .catch(erro => {
                console.log(erro);
            });
    };
});

