function obterUsuarios() { // Método para obter os alunos do arquivo JSON
    return fetch("https://clothean-g1s8.onrender.com/usuarios",{
    credentials: "include"
    })
        .then(res => res.json());
}