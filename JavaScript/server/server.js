const express = require('express');
const cors = require('cors');
const userRoutes = require("../Router/user_routes");
const loginRoutes = require("../Router/login_routes");
const adminRoutes = require("../Router/admin_routes");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "..")));

app.use("/login", loginRoutes);
app.use("/ListaUsuarios", userRoutes);
app.use("/admin", adminRoutes);
app.use("/usuarios", userRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, ()=>{
    console.log(`Servidor a todo vapor na porta ${PORT}`);
})
