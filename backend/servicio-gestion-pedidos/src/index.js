// Importar Express y las rutas de pedidos
const express = require('express');
const pedidoRoutes = require('../src/routes/pedidoRoutes');
const cors = require('cors');
const app = express();
const port = 3002;

// Middleware para habilitar CORS
app.use(cors());

// Middleware para manejar solicitudes JSON
app.use(express.json());

// Middleware para manejar solicitudes codificadas en URL
app.use(express.urlencoded({ extended: true }));

// Ruta de ejemplo para probar la API de pedidos
app.get('/', (req, res) => {
  res.send('¡Hola desde tu servidor Express!');
});

// Usar las rutas de pedidos
app.use('/api_pedidos', pedidoRoutes);

// Iniciar el servidor y escuchar en el puerto 3000
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
