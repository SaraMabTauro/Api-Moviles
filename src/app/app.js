const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const Usuario = require('../routers/UsuarioRoute');
const Producto = require('../routers/ProductRoute');

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use("/users", Usuario);
app.use("/products", Producto);

module.exports = app;