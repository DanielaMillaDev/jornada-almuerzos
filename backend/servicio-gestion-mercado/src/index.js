// Importar Express y las rutas de mercado
const express = require('express');
const mercadoRoutes = require('./routes/mercadoRoutes');
const cors = require('cors');
const app = express();
const port = 3004;

// Middleware para habilitar CORS
app.use(cors());

// Middleware para manejar solicitudes JSON
app.use(express.json());

// Middleware para manejar solicitudes codificadas en URL
app.use(express.urlencoded({ extended: true }));

// Ruta de ejemplo para probar la API
app.get('/', (req, res) => {
  res.send('¡Hola desde tu microservicio gestion mercado!');
});

// Usar las rutas de mercado
app.use('/api_mercado', mercadoRoutes);

// Iniciar el servidor y escuchar en el puerto 3004
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
