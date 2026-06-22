require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRoutes = require("../Router/user_routes");
const loginRoutes = require("../Router/login_routes");
const adminRoutes = require("../Router/admin_routes");
const uRoutes = require("../Router/routes")
const path = require("path");



const app = express();
app.use(cors({
    origin: "https://clothean.vercel.app",
    credentials: true
}));
app.use(express.json());

app.use(cookieParser());

app.use(express.static(path.join(__dirname, "..")));

app.use("/login", loginRoutes);
app.use("/ListaUsuarios", userRoutes);
app.use("/admin", adminRoutes);
app.use("/usuarios", uRoutes);


app.listen(3002, ()=>{
    console.log("Servidor a todo vapor em http://localhost:3002");
})
