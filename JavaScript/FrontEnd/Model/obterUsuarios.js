function obterUsuarios() { // Método para obter os alunos do arquivo JSON
    return fetch("https://clothean-r1xw.onrender.com/usuarios")
        .then(res => res.json());
}