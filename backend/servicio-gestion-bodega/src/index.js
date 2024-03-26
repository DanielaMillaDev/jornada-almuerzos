const express = require('express');
const bodegaRoutes = require('./routes/bodegaRoutes');
const cors = require('cors');
const app = express();
const port = 3003;

// Middleware para habilitar CORS
app.use(cors());

// Middleware para manejar solicitudes JSON
app.use(express.json());

// Middleware para manejar solicitudes codificadas en URL
app.use(express.urlencoded({ extended: true }));

// Ruta de ejemplo para probar la API
app.get('/', (req, res) => {
  res.send('¡Hola desde tu microservicio gestion bodega!');
});

// Usar las rutas de bodega
app.use('/api_bodega', bodegaRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
