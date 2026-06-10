const express = require("express"); // Garante que o servidor seja criado e seja gerenciado, ou seja, ele direciona para o local correto para pegar as informações

const cors = require("cors"); // É um método que permite que um site posso acessar as informações de outro site mesmo com a porta ou o direcionamento diferente

const rotas = require("./Router/routes"); // É um garçom que anota o que deseja ser feito, ler, escrever, editar, deletar, etc

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use(rotas)

app.listen(3000, () => {
    console.log("Servidor rodando");
}); 