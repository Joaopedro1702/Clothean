function obterUsuariosEmail(id) { // Método para obter os alunos do arquivo JSON
return fetch(`https://clothean-g1s8.onrender.com/usuarios/${id}`, {
    headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
    }
})
.then(res => res.json());
}