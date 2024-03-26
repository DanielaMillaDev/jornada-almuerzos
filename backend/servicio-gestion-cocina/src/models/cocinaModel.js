// Configuración de la conexión a la base de datos MySQL
const pool = require('../config/dbConfig');

async function crearPlato(nuevoPlato) {
  try {
    const connection = await pool.getConnection();

    const sql = 'CALL InsertarPlatoYActualizarPedido(?, ?, ?)';

    const [rows] = await connection.execute(sql, [nuevoPlato.id_pedido, nuevoPlato.id_receta, nuevoPlato.numero_plato]);

    connection.release();

    return rows.insertId;
  } catch (error) {
    throw error;
  }
}

async function crearSolicitudBodega(nuevaSolicitud) {
  try {
    const connection = await pool.getConnection();

    const sql = 'CALL InsertarSolicitudBodegaYActualizarPedido(?, ?, ?)';

    const [rows] = await connection.execute(sql, [nuevaSolicitud.id_receta, nuevaSolicitud.id_plato, nuevaSolicitud.id_pedido]);

    connection.release();

    return rows.insertId;
  } catch (error) {
    throw error;
  }
}

async function verPedido() {
  try {
    const connection = await pool.getConnection();

    const sql = `SELECT p.id_pedido,
                    x.cantidad_maxima AS numero_plato,
                    COALESCE(r.id_estado_plato, 0) AS id_estado_plato,
                    COALESCE(e.estado, '') AS estado,
                    COALESCE(r.id_plato, 0) AS id_plato,
                    COALESCE(d.receta, '') AS receta,
                    COALESCE(d.id_receta, 0) AS id_receta
                FROM pedido p
                JOIN cantidad_platos x ON x.cantidad_maxima<= p.cantidad_platos
                LEFT JOIN plato r ON r.id_pedido = p.id_pedido AND r.numero_plato = x.cantidad_maxima
                LEFT JOIN estado_plato e ON e.id_estado_plato = r.id_estado_plato
                LEFT JOIN recetas d ON d.id_receta = r.id_receta
                WHERE COALESCE(r.id_estado_plato, 0) != 4
                ORDER BY p.id_pedido, numero_plato;`;

    const [rows] = await connection.execute(sql);

    connection.release();

    return rows
  } catch (error) {
    throw error;
  }
}

async function verIngredientes(ingredientesReceta) {
  try {
    const connection = await pool.getConnection();

    const sql = `SELECT i.id_ingrediente
                      , i.ingrediente
                FROM ingredientes i
                INNER JOIN recetas_ingredientes r ON i.id_ingrediente = r.id_ingrediente
                WHERE r. id_receta = ? `;

    const [rows] = await connection.execute(sql, [ingredientesReceta.id_receta]);

    connection.release();

    return rows
  } catch (error) {
    throw error;
  }
}

async function verRecetas() {

  try {
    const connection = await pool.getConnection();

    const sql = `SELECT id_receta,
                        receta
                FROM recetas`;

    const [rows] = await connection.execute(sql);

    connection.release();

    return rows
  } catch (error) {
    throw error;
  }
}

async function entregarPlato(entregaPlato) {
  try {
    const connection = await pool.getConnection();

    const sql = 'CALL EntregarPlatoYActualizarPedido(?, ?)';

    const [rows] = await connection.execute(sql, [entregaPlato.id_plato, entregaPlato.id_pedido]);

    let salida = rows[0][0].salida;

    connection.release();

    return salida
  } catch (error) {
    throw error;
  }
}

async function verHistorialPedidos() {

  try {
    const connection = await pool.getConnection();

    const sql = `SELECT p.id_pedido,
                        r.receta
                FROM pedido p
                INNER JOIN plato i ON i.id_pedido = p.id_pedido
                INNER JOIN recetas r ON r.id_receta = i.id_receta
                WHERE p.id_estado IN(3,4)`;

    const [rows] = await connection.execute(sql);

    connection.release();

    return rows
  } catch (error) {
    throw error;
  }
}
module.exports = {
  crearPlato,
  verPedido, verRecetas,
  crearSolicitudBodega,
  entregarPlato,
  verHistorialPedidos,
  verIngredientes
};
