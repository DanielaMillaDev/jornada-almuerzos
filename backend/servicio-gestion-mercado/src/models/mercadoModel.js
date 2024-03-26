// Configuración de la conexión a la base de datos MySQL
const pool = require('../config/dbConfig');


async function verIngredientesMercado() {
  try {
    const connection = await pool.getConnection();

    const sql = `SELECT id_ingrediente
                        , ingrediente
                  FROM ingredientes`;

    const [rows] = await connection.execute(sql);

    connection.release();

    return rows
  } catch (error) {
    throw error;
  }
}

async function verRecetasDisponibles() {
  try {
    const connection = await pool.getConnection();

    const sql = `SELECT id_receta
                      , receta
                FROM recetas`;

    const [rows] = await connection.execute(sql);

    connection.release();

    return rows
  } catch (error) {
    throw error;
  }
}

async function verHistorialCompras() {
  try {

    const connection = await pool.getConnection();

    const sql = `SELECT c.id_compra
                      , g.ingrediente
                      , c.cantidad_compra
                      , date_format(c.fecha_compra,'%d-%m-%Y')as fecha_compra
                FROM mercado_compras c
                INNER JOIN ingredientes g ON g.id_ingrediente = c.id_ingrediente`;

    const [rows] = await connection.execute(sql);

    connection.release();

    return rows
  } catch (error) {
    throw error;
  }
}

async function comprarIngrediente(comprarIngrediente) {
  try {
    const connection = await pool.getConnection();

    const sql = 'CALL ComprarYActualizarIngrediente(?,?)';

    const [rows] = await connection.execute(sql, [comprarIngrediente.id_ingrediente, comprarIngrediente.cantidad_compra]);

    connection.release();

    return rows.insertId;
  } catch (error) {
    throw error;
  }
}

module.exports = { verIngredientesMercado, verRecetasDisponibles, verHistorialCompras, comprarIngrediente };
