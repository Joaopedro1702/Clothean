const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
    console.log("cookies:", req.cookies);
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
    const token = req.headers.authorization?.split(" ")[1];

    if (!token){
        return res.status(401).json({error: "Acesso negado. Token não não fornecido."});
    }
    try{
        const decodificado = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodificado;
        next();
    }catch(error){
        console.error("Token inválido:", error);
        res.status(401).json({message: 'Token inválido ou expirdo.'});
    }
}
module.exports = {verificarToken};