// Regras do servidor, lógica de dados

const repositories = require("../Repositorie/repositories")
const bcrypt = require("bcryptjs")

exports.listar = (callback) => { // req: O que o cliente pediu, como parâmetros, header e body ; res: O que o servidor vai responder 
    repositories.listar((resultado) => {
        callback(resultado)
    }); // Variável que contém o array gerado pela função
}

exports.listarUsuarioId = (id, callback) => { // req: O que o cliente pediu, como parâmetros, header e body ; res: O que o servidor vai responder 
    repositories.buscaUsuarioComumId(id, (resultado) => {
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
    repositories.buscaEmail(usuario.email, (erro, usuarioEncontrado) => {
        console.log("--> 2. Erro:", erro, "| Usuário:", usuarioEncontrado);

        if (erro) {
            return callback({ erro: "Erro interno no servidor." });
        }

        if (!usuarioEncontrado) {
            return callback({ erro: "Email ou Senha inválidos!" });
        }

        console.log("--> 3. Senha digitada:", usuario.senha, "| Hash do banco:", usuarioEncontrado.senha);
        const senhaValida = bcrypt.compareSync(usuario.senha, usuarioEncontrado.senha);

        console.log("--> 4. Bcrypt validou?", senhaValida);
        if (!senhaValida) {
            return callback({ erro: "Email ou Senha inválidos!" });
        }

        const { senha, ...usuarioSeguro } = usuarioEncontrado;
        callback(null, usuarioSeguro);
    });
};
