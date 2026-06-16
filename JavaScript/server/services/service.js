const repositories = require("../repositories/repositories");
const bcrypt = require("bcrypt");

exports.listar = (callback) => {
    repositories.listar((resultado) => {
        callback(resultado);
    });
};

exports.cadastrar = (usuario, callback) => {
    const saltRounds = 10;
    usuario.senha = bcrypt.hashSync(usuario.senha, saltRounds);
    repositories.inserirUsuario(usuario, (resultado) => {
        callback(resultado);
    });
};

exports.excluir = (id, callback) => {
    repositories.excluirUsuario(id, (resultado) => {
        callback(resultado);
    });
};

exports.editar = (usuario, callback) => {
    const saltRounds = 10;
    usuario.senha = bcrypt.hashSync(usuario.senha, saltRounds);
    repositories.editarUsuario(usuario, callback);
};

exports.loginUsuario = (usuario, callback) => {
    repositories.buscaEmail(usuario.email, (usuarioEncontrado) => {
        if (!usuarioEncontrado) {
            return callback({ erro: "Email ou Senha inválidos!" });
        }

        const senhaValida = bcrypt.compareSync(usuario.senha, usuarioEncontrado.senha);

        if (!senhaValida) {
            return callback({ erro: "Email ou Senha inválidos!" });
        }

        const { senha, ...usuarioSeguro } = usuarioEncontrado;
        callback(null, usuarioSeguro);
    });
};
