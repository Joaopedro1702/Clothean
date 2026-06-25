const express = require('express');
const cors = require('cors');
const userRoutes = require("../server/routes/user_routes");
const loginRoutes = require("../server/routes/login_routes");
const adminRoutes = require("../server/routes/admin_routes");
const path = require("path");

const app = express();
app.use(cors({
    origin: "https://clothean.vercel.app",
    credentials: true
}));
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
