function obterUsuariosEmail(id) { // Método para obter os alunos do arquivo JSON
    return fetch(`https://clothean-r1xw.onrender.com/usuarios/${id}`)
        .then(res => res.json());
}