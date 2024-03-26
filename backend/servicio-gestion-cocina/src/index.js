// Importar Express y las rutas de cocina
const express = require('express');
const pedidoRoutes = require('./routes/cocinaRoutes');
const cors = require('cors');
const app = express();
const port = 3001;

// Middleware para habilitar CORS
app.use(cors());

// Middleware para manejar solicitudes JSON
app.use(express.json());

// Middleware para manejar solicitudes codificadas en URL
app.use(express.urlencoded({ extended: true }));

// Ruta de ejemplo para probar la API
app.get('/', (req, res) => {
  res.send('¡Hola desde tu microservicio gestion cocina!');
});

// Usar las rutas de pedidos
app.use('/api_cocina', pedidoRoutes);

// Iniciar el servidor y escuchar en el puerto 3001
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
