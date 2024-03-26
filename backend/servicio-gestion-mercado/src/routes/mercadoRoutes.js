// mercadoRoutes.js
// Importar Express y el controlador de mercado
const express = require('express');
const mercadoController = require('../controllers/mercadoController');
const router = express.Router();

// rutas de apis
router.get('/ver_ingredientes_mercado', mercadoController.verIngredientesMercado);
router.get('/ver_historial_compras', mercadoController.verHistorialCompras);
router.get('/ver_recetas', mercadoController.verRecetasDisponibles);
router.post('/comprar_ingrediente', mercadoController.comprarIngrediente);

module.exports = router;
