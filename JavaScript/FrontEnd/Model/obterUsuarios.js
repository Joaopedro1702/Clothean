function obterUsuarios() { // Método para obter os alunos do arquivo JSON
    return fetch("http://localhost:3000/usuarios")
        .then(res => res.json());
}