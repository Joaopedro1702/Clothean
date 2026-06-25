const tabela = document.getElementById("CorpoTabela")

tabela.addEventListener("click", function (e) {

    e.preventDefault()
    
    const linha = excluirUsuario(e)

    const id = linha.dataset.id // Pegamos o Id guardado na linha

    fetch(`${baseUrl}/usuarios/${id}`, {
        method: "DELETE",
        credentials: "include"
    })
        .then(response => response.json())
        .then(dados => {
            // Se o servidor deletou com sucesso, remove a linha da tela na hora
            linha.remove();
            mensagemSucesso("Aluno removido!");
            consultaUsuarios()
        })
        .catch(erro => {
            console.log(erro);
        });
})