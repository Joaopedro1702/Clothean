function criarColuna(valor) {
    const coluna = document.createElement("td");
    coluna.textContent = valor;                  // Criar a coluna e coloca o que vai ter de text nela
    return coluna
}

function criarColunaBotaoExcluir(textContent) {
    const colunaBotao = document.createElement("td");
    const botao = document.createElement("button");
    botao.type = "button"
    botao.textContent = textContent  // Criar o botão e coloca o texto dele e as classes que vai ter
    botao.classList.add("btn", "btn-danger", "btnExcluir")
    colunaBotao.appendChild(botao)
    return colunaBotao
}

function criarColunaBotaoEditar(textContent) {
    const colunaBotao = document.createElement("td");
    const botao = document.createElement("button");
    botao.type = "button"
    botao.textContent = textContent  // Criar o botão e coloca o texto dele e as classes que vai ter
    botao.classList.add("btn", "btn-info", "btnEditarFuncao")
    botao.setAttribute("data-bs-toggle", "modal")
    botao.setAttribute("data-bs-target", "#modalEditar")
    colunaBotao.appendChild(botao)
    return colunaBotao
}

function criarLinha(id, nome, email, cpf, telefone, perfil) {

    const linha = document.createElement("tr");
    linha.className = "Usuario"                   // Cria a linha e coloca o nome dela
    linha.dataset.id = id;

    linha.appendChild(criarColuna(id));
    linha.appendChild(criarColuna(nome));
    linha.appendChild(criarColuna(email));
    linha.appendChild(criarColuna(cpf));
    linha.appendChild(criarColuna(telefone));
    linha.appendChild(criarColuna(perfil));
    linha.appendChild(criarColunaBotaoExcluir("Excluir"));
    linha.appendChild(criarColunaBotaoEditar("Editar"));

    return linha
}

function excluirUsuario(e) {
    const elementoClicado = e.target;
    // Captura o ID do aluno que salvamos no dataset da linha
    if (elementoClicado.classList.contains("btnExcluir")) {
        // Primeiro localizamos a linha onde está o ID, SEM APAGAR ELA!
        const linha = elementoClicado.closest("tr");
        return linha
    }
}

function editarUsuario(e) {
    const elementoClicado = e.target;
    // Captura o ID do aluno que salvamos no dataset da linha
    if (elementoClicado.classList.contains("btnEditarFuncao")) {
        // Primeiro localizamos a linha onde está o ID, SEM APAGAR ELA!
        const linha = elementoClicado.closest("tr");
        const idUsuario = linha.dataset.id;
        console.log(linha)
        console.log(idUsuario)
        const btnEditarModal = document.getElementById("btnEditar");
        if(btnEditarModal) {
            btnEditarModal.dataset.idUsuarioAtual = idUsuario;
        }
        return linha
    }
}

function alterandoPrimeiraLetra(palavra) {
    let texto = palavra.charAt(0).toUpperCase() + palavra.slice(1)
    return texto
}