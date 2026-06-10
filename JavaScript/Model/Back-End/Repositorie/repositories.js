// Armazena os dados do sistema (Banco de Dados)
const conexao = require("../../../DataBase/conexao");

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


exports.editar = (usuario, callback) => {
    const sql = "UPDATE Tbl_Usuario SET nome = ?, email = ?, cpf = ?, telefone = ?, senha = ?, perfil = ? WHERE id = ?";

    conexao.query(sql, [usuario.nome, usuario.email, usuario.cpf, usuario.telefone, usuario.senha, usuario.perfil, usuario.id], (erro, resultado) => {
        if (erro) {
            throw erro;
        }        

        callback(resultado);
    });
};