// pedidoRoutes.js
// Archivo para definir las rutas relacionadas con los pedidos

const express = require('express');
const pedidoController = require('../controllers/pedidoController');
const router = express.Router();

router.get('/ver_pedidos', pedidoController.verPedidos);
router.post('/nuevo_pedido', pedidoController.crearPedido);
router.post('/entregar_pedido', pedidoController.entregarPedido);

module.exports = router;
