// Recebe o fetch, direciona para a ação correta

const { raw } = require("mysql2");
const jwt = require("jsonwebtoken");
const modelBackSer = require("../modelService/service")

exports.listar = (req, res) => {
    modelBackSer.listar((resultado) => {
        res.json(resultado);
    })
}

exports.cadastrar = (req, res) => {
    const usuario = req.body;
    modelBackSer.cadastrar(usuario, (erro, resultado) => {
        if(erro) {
            return res.status(400).json({
                mensagem: "Erro ao gravar no banco de dados: " + erro.message
            });
        }
        return res.status(201).json({
            mensagem: "Usuario Inserido com Sucesso!"
        });
    });
}

exports.excluir = (req, res) => {
    const id = parseInt(req.params.id);
    modelBackSer.excluir(id, () => {
        res.status(201).json({
            mensagem: "Usuario Deletado com Sucesso!"
        });
    });
};

exports.editar = (req, res) => {
    const idUrl = parseInt(req.params.id); 
    const dadosUsuario = req.body; 
    dadosUsuario.id = idUrl;

    if (!dadosUsuario.id) {
        return res.status(400).json({ mensagem: "Erro: O ID do usuario não foi identificado na URL." });
    }

    modelBackSer.editar(dadosUsuario, (resultado) => {
        // Agora que sabemos que o afetado é 1, ele vai pular esse IF direto para o sucesso!
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ 
                mensagem: "Não foi possível editar: Usuario não encontrado com o ID informado." 
            });
        }

        // O Node vai responder isso aqui para o seu Frontend:
        return res.status(200).json({
            mensagem: "Usuario ajustado com Sucesso!"
        });
    });
};

exports.editarAdm = (req, res) => {
    const idUrl = parseInt(req.params.id); 
    const dadosUsuario = req.body; 
    dadosUsuario.id = idUrl;

    if (!dadosUsuario.id) {
        return res.status(400).json({ mensagem: "Erro: O ID do usuario não foi identificado na URL." });
    }

    modelBackSer.editarAdm(dadosUsuario, (resultado) => {
        // Agora que sabemos que o afetado é 1, ele vai pular esse IF direto para o sucesso!
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ 
                mensagem: "Não foi possível editar: Usuario não encontrado com o ID informado." 
            });
        }

        // O Node vai responder isso aqui para o seu Frontend:
        return res.status(200).json({
            mensagem: "Usuario ajustado com Sucesso!"
        });
    });
};

exports.excluirAdm = (req, res) => {
   const id = parseInt(req.params.id);
    modelBackSer.excluir(id, () => {
        res.status(201).json({
            mensagem: "Usuario Deletado com Sucesso!"
        });
    });
};

exports.login = (req, res) => { 
    const dadosUsuario = req.body; 

    modelBackSer.loginUsuario(dadosUsuario, (erro, usuario) => {
        // Agora que sabemos que o afetado é 1, ele vai pular esse IF direto para o sucesso!
        if (erro) {
            return res.status(401).json({ 
                mensagem: erro.erro 
            });
        }

        const segredoJWT = "senhaToken";

        const token = jwt.sign(
            {id: usuario.id, email: usuario.email, perfil: usuario.perfil, nome: usuario.nome},
            segredoJWT,
            {expiresIn: "1h"}
        )

        // O Node vai responder isso aqui para o seu Frontend:
        return res.status(200).json({
            mensagem: "Login efetuado com Sucesso!",
            token: token,
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                perfil: usuario.perfil
            }
        });
    });
};

