// bodegaRoutes.js

// Archivo para definir las rutas relacionadas con la bodega

const express = require('express');
const bodegaController = require('../controllers/bodegaController');
const router = express.Router();

router.get('/ver_solicitudes', bodegaController.verSolicitudes);
router.get('/ver_inventario_ingredientes', bodegaController.verInventarioIngredientes);

router.post('/ver_ingredientes_solicitud', bodegaController.verIngredientesSolicitud);
router.post('/enviar_ingredientes', bodegaController.enviarIngredientes);

module.exports = router;
