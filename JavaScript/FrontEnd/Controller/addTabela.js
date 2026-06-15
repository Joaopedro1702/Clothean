function addInfoUsuario(id, nome, email, cpf, telefone, perfil) {

    const tabela = document.getElementById("CorpoTabela"); // Pegar o corpo da tabela
    const usuario = criarLinha(id, nome, email, cpf, telefone, perfil); // Cria a Linha;
    tabela.appendChild(usuario)
    return usuario; // Retorna a linha do Aluno
}

// Colocar o fetch aqui, para adicionar o usuário na tabela (consultar)