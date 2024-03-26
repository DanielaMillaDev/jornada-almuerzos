// Configuración de la conexión a la base de datos MySQL
const pool = require('../config/dbConfig');

async function crearPedido(nuevoPedido) {

  try {
    const connection = await pool.getConnection();

    const sql = 'CALL CrearSolicitudPedido(?,?)';

    const [rows] = await connection.execute(sql, [nuevoPedido.id_estado, nuevoPedido.cant_platos]);

    connection.release();

    return rows.insertId;
  } catch (error) {
    throw error;
  }
}

async function entregarPedido(entregarPedido) {

  try {
    const connection = await pool.getConnection();

    const sql = 'CALL EntregarPedido(?)';

    const [rows] = await connection.execute(sql, [entregarPedido.id_pedido]);

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
                      p.id_estado,
                      e.estado,
                      p.cantidad_platos,
                      COALESCE(x.platos_listos, 0) AS platos_listos
                FROM pedido p
                INNER JOIN estado_pedido e ON p.id_estado = e.id_estado
                LEFT JOIN (
                            SELECT id_pedido, 
                            COUNT(*) AS platos_listos
                            FROM plato
                            WHERE id_estado_plato = 4
                            GROUP BY id_pedido
                ) AS x ON p.id_pedido = x.id_pedido
                ORDER BY p.id_pedido;`;

    const [rows] = await connection.execute(sql);

    connection.release();

    return rows
  } catch (error) {
    throw error;
  }
}

module.exports = {
  crearPedido,
  entregarPedido,
  verPedido
};
