const express = require("express")
const cors = require('cors')
const routers = require("./routers/routers")
const errorHandling = require("./error/errorHandling")

const app = express();

// Middleware para manejar solicitudes con formato JSON
app.use(express.json());

// Habilitar CORS (si es necesario para el frontend)
app.use(cors());

// Rutas del producto
app.use('/api', productRoutes); // Prefijo 'api' para las rutas del producto

export default app;