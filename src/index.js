const app = require("./app/app");
const sequelize = require("./database");

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});