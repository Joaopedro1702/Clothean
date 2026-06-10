
const mysql = require("mysql2");

const conexao = mysql.createConnection({
    host: 'localhost',
    port: 3308,
    user: 'root',
    password: '',
    database: 'db_Clothean'
});

module.exports = conexao;