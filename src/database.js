const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASSWORD, 
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT, 
  }
);

async function syncDatabase() {
  try {
    await sequelize.authenticate(); 
    console.log("Conexión a la base de datos establecida correctamente.");
    
    await sequelize.sync({ alter: true }); 
    console.log("Las tablas se han sincronizado correctamente.");
  } catch (error) {
    console.error("No se pudo conectar a la base de datos:", error);
  }
}

syncDatabase();

module.exports = sequelize;