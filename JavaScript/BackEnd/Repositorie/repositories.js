// Armazena os dados do sistema (Banco de Dados)
const conexao = require("../DataBase/conexao");

exports.listar = (callback) => {
    const sql = "SELECT * FROM Tbl_Usuario";

    conexao.query(sql, (erro, resultado) => {
        if (erro) {
            throw erro;
        }

        callback(resultado);
    });
};

exports.inserirUsuario = (usuario, callback) => {
    const sql = "INSERT INTO Tbl_Usuario (nome, email, cpf, telefone, senha) VALUES (?, ?, ?, ?, ?)";

    conexao.query(sql, [usuario.nome, usuario.email, usuario.cpf, usuario.telefone, usuario.senha], (erro, resultado) => {
        if (erro) {
            throw erro;
        }

        callback(resultado);
    });
};

exports.excluirUsuario = (id, callback) => {
    const sql = "DELETE FROM Tbl_Usuario WHERE id = ?";

    conexao.query(sql, [id], (erro, resultado) => {
        if (erro) {
            throw erro;
        }

        callback(resultado);
    });
};


exports.editarUsuario = (usuario, callback) => {
    const sql = "UPDATE Tbl_Usuario SET nome = ?, email = ?, cpf = ?, telefone = ?, senha = ? WHERE id = ?";

    conexao.query(sql, [usuario.nome, usuario.email, usuario.cpf, usuario.telefone, usuario.senha, usuario.id], (erro, resultado) => {
        if (erro) {
            throw erro;
        }

        callback(resultado);
    });
};

exports.buscaEmail = (email, callback) => {
    const sql = "SELECT * FROM tbl_Usuario WHERE email = ?";

    conexao.query(sql, [email], (erro, resultado) => {
        if (erro) {
            throw erro;
        }

        if (resultado.length === 0) {
            return callback(null);
        }

        callback(resultado[0]);
    });
};