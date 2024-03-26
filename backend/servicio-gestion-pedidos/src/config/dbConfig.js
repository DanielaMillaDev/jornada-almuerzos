// Importa el paquete dotenv
require('dotenv').config();

// Importa el paquete mysql2/promise
const mysql = require('mysql2/promise');

// Configura la conexión a la base de datos MySQL utilizando las variables de entorno
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port:process.env.DB_PORT
});

module.exports = pool;
