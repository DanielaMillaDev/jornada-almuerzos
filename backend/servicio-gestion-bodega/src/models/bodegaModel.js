// Configuración de la conexión a la base de datos MySQL
const pool = require('../config/dbConfig');

async function verSolicitudes() {
    try {
      const connection = await pool.getConnection();
  
      const sql = `SELECT s.id_solicitud_bodega
                        , s.id_receta
                        , p.id_estado_plato
                        , r.receta
                        , j.id_estado
                        , o.estado	
                        , p.id_plato
                  FROM bodega_solicitudes s
                  INNER JOIN recetas r ON s.id_receta = r.id_receta
                  INNER JOIN plato p ON p.id_plato = s.id_plato
                  INNER JOIN pedido j ON j.id_pedido = p.id_pedido
                  INNER JOIN estado_plato o ON o.id_estado_plato = p.id_estado_plato
                  WHERE p.id_estado_plato = 2`;
  
      const [rows] = await connection.execute(sql);
      connection.release();
  
      return rows
    } catch (error) {
      throw error;
    }
}

async function verInventarioIngredientes() {
  try {
  
    const connection = await pool.getConnection();

    const sql = `SELECT id_ingrediente
                      , ingrediente
                      , cantidad_ingredientes
                FROM ingredientes`;

    const [rows] = await connection.execute(sql);
    connection.release();

    return rows
  } catch (error) {
    throw error;
  }
}

async function verIngredientesSolicitud(verIngredientes) {
  try {
    const connection = await pool.getConnection();

    const sql = `SELECT r.id_receta,
                		    i.id_ingrediente,
                		    i.ingrediente,
                		    i.cantidad_ingredientes
                FROM recetas_ingredientes r 
                INNER JOIN ingredientes i ON r.id_ingrediente = i.id_ingrediente
                WHERE id_receta = ?`;

    const [rows] = await connection.execute(sql, [verIngredientes.id_receta]);

    connection.release();

    return rows
  } catch (error) {
    throw error;
  }
}

async function enviarIngredientes(envioIngredientes) {
  try {
    const connection = await pool.getConnection();

    const sql = 'CALL EnviarIngredientesPlato(?)';

    const [rows] = await connection.execute(sql, [ envioIngredientes.id_plato]);

    connection.release();

    return rows.insertId;
  } catch (error) {
    throw error;
  }
}

module.exports = { verSolicitudes, verInventarioIngredientes, verIngredientesSolicitud, enviarIngredientes};
