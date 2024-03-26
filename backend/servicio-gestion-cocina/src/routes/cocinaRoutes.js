// cocinaRoutes.js
// Archivo para definir las rutas relacionadas con la cocina
const express = require('express');
const cocinaController = require('../controllers/cocinaController');
const router = express.Router();

router.get('/ver_recetas', cocinaController.verRecetas);
router.get('/ver_pedidos', cocinaController.verPedidos);
router.get('/ver_historial_pedidos', cocinaController.verHistorialPedidos);

router.post('/insertar_plato_aleatorio', cocinaController.crearPlatoAleatorio);
router.post('/solicitud_bodega', cocinaController.crearSolicitudBodega);
router.post('/entregar_plato', cocinaController.entregarPlato);
router.post('/ver_ingredientes', cocinaController.verIngredientes);

module.exports = router;
