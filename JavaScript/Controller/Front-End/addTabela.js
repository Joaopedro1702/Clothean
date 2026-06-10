function addInfoUsuario(id, nome, email, cpf, telefone, senha, perfil) {

    const tabela = document.getElementById("CorpoTabela"); // Pegar o corpo da tabela
    const usuario = criarLinha(id, nome, email, cpf, telefone, senha, perfil); // Cria a Linha;
    const botaoExcluir = usuario.querySelector(".btnExcluir");
    const botaoEditar = usuario.querySelectorAll(".btnEditar");
    tabela.appendChild(usuario);

    return usuario; // Retorna a linha do Aluno
}

// Colocar o fetch aqui, para adicionar o usuário na tabela (consultar)