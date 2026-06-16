const conexao = require("../DataBase/conexao");

exports.listar = async (callback) => {
    const sql = "SELECT * FROM tbl_Usuario";
    const [resultado] = await conexao.query(sql);
    callback(resultado);
};

exports.inserirUsuario = async (usuario, callback) => {
    const sql = "INSERT INTO tbl_Usuario (nome, email, cpf, telefone, senha) VALUES (?, ?, ?, ?, ?)";
    const [resultado] = await conexao.query(sql, [usuario.nome, usuario.email, usuario.cpf, usuario.telefone, usuario.senha]);
    callback(resultado);
};

exports.excluirUsuario = async (id, callback) => {
    const sql = "DELETE FROM tbl_Usuario WHERE id = ?";
    const [resultado] = await conexao.query(sql, [id]);
    callback(resultado);
};

exports.editarUsuario = async (usuario, callback) => {
    const sql = "UPDATE tbl_Usuario SET nome = ?, email = ?, cpf = ?, telefone = ?, senha = ? WHERE id = ?";
    const [resultado] = await conexao.query(sql, [usuario.nome, usuario.email, usuario.cpf, usuario.telefone, usuario.senha, usuario.id]);
    callback(resultado);
};

exports.buscaEmail = async (email, callback) => {
    const sql = "SELECT * FROM tbl_Usuario WHERE email = ?";
    const [resultado] = await conexao.query(sql, [email]);

    if (resultado.length === 0) {
        return callback(null);
    }

    callback(resultado[0]);
};

exports.editarAdm = async (usuario, callback) => {
    const sql = "UPDATE tbl_Usuario SET nome = ?, email = ?, cpf = ?, telefone = ?, perfil = ? WHERE id = ?";
    const [resultado] = await conexao.query(sql, [usuario.nome, usuario.email, usuario.cpf, usuario.telefone, usuario.perfil, usuario.id]);
    callback(resultado);
};