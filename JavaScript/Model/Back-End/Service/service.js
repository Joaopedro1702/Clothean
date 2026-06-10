// Regras do servidor, lógica de dados

const repositories = require("../Repositorie/repositories")

exports.listar = (callback) => { // req: O que o cliente pediu, como parâmetros, header e body ; res: O que o servidor vai responder 
    repositories.listar((resultado) => {
        callback(resultado)
    }); // Variável que contém o array gerado pela função
}

exports.cadastrar = (usuario, callback) => {
    repositories.inserirUsuario(usuario, (resultado) => {
        callback(resultado)
    });
};

exports.excluir = (id, callback) => {
    console.log("oi")
    repositories.excluirUsuario(id, (resultado) => {
        callback(resultado)
    });
};

exports.editar = (usuario, callback) => {
    repositories.editar(usuario, callback);
};
