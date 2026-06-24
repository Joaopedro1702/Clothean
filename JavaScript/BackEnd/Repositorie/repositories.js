// Armazena os dados do sistema (Banco de Dados)
const conexao = require("../DataBase/conexao");

exports.listar = (callback) => {
    const sql = "SELECT * FROM tbl_Usuario";

    conexao.query(sql, (erro, resultado) => {
        if (erro) {
            throw erro;
        }

        callback(resultado);
    });
};

exports.inserirUsuario = (usuario, callback) => {
    const sql = "INSERT INTO tbl_Usuario (nome, email, cpf, telefone, senha, perfil) VALUES (?, ?, ?, ?, ?, ?)";

    // Se o frontend não mandou perfil, definimos como 'Usuario' por padrão
    const perfil = usuario.perfil || 'Usuario';

    conexao.query(
        sql, [usuario.nome, usuario.email, usuario.cpf, usuario.telefone, usuario.senha, perfil], (erro, resultado) => {
            if (erro) {
                console.error("Erro real dentro do MySQL:", erro.message);
                return callback(erro, null); // Passa o erro para o service
            }
            callback(null, resultado); // Sucesso absoluto
        }
    );
};

exports.excluirUsuario = (id, callback) => {
    const sql = "DELETE FROM tbl_Usuario WHERE id = ?";

    conexao.query(sql, [id], (erro, resultado) => {
        if (erro) {
            throw erro;
        }

        callback(resultado);
    });
};


exports.editarUsuario = (usuario, callback) => {
    const sql = "UPDATE tbl_Usuario SET nome = ?, email = ?, cpf = ?, telefone = ?, senha = ? WHERE id = ?";

    conexao.query(sql, [usuario.nome, usuario.email, usuario.cpf, usuario.telefone, usuario.senha, usuario.id], (erro, resultado) => {
        if (erro) {
            throw erro;
        }

        callback(resultado);
    });
};

exports.buscaUsuarioComumId= (id, callback) => {
    const sql = "SELECT * FROM tbl_Usuario WHERE id = ?";

    conexao.query(sql, [id], (erro, resultado) => {
        if (erro) {
            throw erro;
        }

        if (resultado.length === 0) {
            return callback(null);
        }

        callback(resultado[0]);
    });
};

exports.buscaEmail = (email, callback) => {
    const sql = "SELECT * FROM tbl_Usuario WHERE email = ?";

    conexao.query(sql, [email], (erro, resultado) => {
        if (erro) {
            return callback(erro, null); // erro no primeiro argumento
        }

        if (resultado.length === 0) {
            return callback(null, null); // não encontrou, mas sem erro
        }

        callback(null, resultado[0]); // ✅ null primeiro, depois o dado
    });
};

exports.editarAdm = (usuario, callback) => {
    const sql = "UPDATE tbl_Usuario SET nome = ?, email = ?, cpf = ?, telefone = ?, perfil = ? WHERE id = ?";

    conexao.query(sql, [usuario.nome, usuario.email, usuario.cpf, usuario.telefone, usuario.perfil, usuario.id], (erro, resultado) => {
        if (erro) {
            throw erro;
        }

        callback(resultado);
    });
};