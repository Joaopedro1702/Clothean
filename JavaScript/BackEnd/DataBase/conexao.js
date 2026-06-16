const mysql = require("mysql2");
require('dotenv').config({ path: require('path').join(__dirname, '../../../.env') });

const conexao = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: { rejectUnauthorized: false }
});

conexao.connect((err) => {
    if (err) console.error('Erro ao conectar:', err);
    else console.log('Conectado ao Aiven!');
});

module.exports = conexao;