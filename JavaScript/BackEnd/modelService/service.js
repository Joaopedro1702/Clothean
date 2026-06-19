// Regras do servidor, lógica de dados

const repositories = require("../Repositorie/repositories")
const bcrypt = require("bcryptjs")

exports.listar = (callback) => { // req: O que o cliente pediu, como parâmetros, header e body ; res: O que o servidor vai responder 
    repositories.listar((resultado) => {
        callback(resultado)
    }); // Variável que contém o array gerado pela função
}

exports.cadastrar = (usuario, callback) => {
    const saltRounds = 10;

    usuario.senha = bcrypt.hashSync(usuario.senha, saltRounds);

    repositories.inserirUsuario(usuario, (erro, resultado) => {
        callback(erro, resultado)
    });
};

exports.excluir = (id, callback) => {
    repositories.excluirUsuario(id, (resultado) => {
        callback(resultado)
    });
};

exports.editar = (usuario, callback) => {
    const saltRounds = 10;

    usuario.senha = bcrypt.hashSync(usuario.senha, saltRounds);

    repositories.editarUsuario(usuario, callback);
};

exports.editarAdm = (usuario, callback) => {

    repositories.editarAdm(usuario, callback);
};

exports.loginUsuario = (usuario,  callback) => {
    console.log("--> 1. Dados recebidos no Service:", usuario);

    repositories.buscaEmail(usuario.email, (usuarioEncontrado) => {
        console.log("--> 2. Retorno do Banco de Dados:", usuarioEncontrado);

        if (!usuarioEncontrado) {
            console.log("--> BLOQUEIO: Usuário não foi encontrado no banco.");
            return callback({ erro: "Email ou Senha inválidos!" });
        }

        console.log("--> 3. Comparando Senha digitada:", usuario.senha, "com Senha do Banco:", usuarioEncontrado.senha);
        const senhaValida = bcrypt.compareSync(usuario.senha, usuarioEncontrado.senha)

        console.log("--> 4. O Bcrypt validou? ", senhaValida);
        if (!senhaValida) {
            console.log("--> BLOQUEIO: Senha incorreta segundo o Bcrypt.");
            return callback({ erro: "Email ou Senha inválidos!" })
        }

        const { senha, ...usuarioSeguro } = usuarioEncontrado;
        callback(null, usuarioSeguro)
    })
}