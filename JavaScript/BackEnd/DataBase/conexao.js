
require('dotenv').config();

console.log("PORTA CARREGADA DO ENV:", process.env.DB_PORT);

const mysql = require("mysql2");

// const conexao = mysql.createConnection({
//     host: 'localhost',
//     port: 3308,
//     user: 'root',
//     password: '',
//     database: 'db_Clothean'
// });

// module.exports = conexao;

// Cria a conexão com o banco MySQL do Aiven
const conexao = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    // Configurando SSL necessária para conexão com banco em nuvem
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = conexao;
