require('dotenv').config(); // Cargar variables de entorno desde el archivo .env
const express = require("express");
const cors = require("cors");
const routers = require("./src/routers/routers"); // Rutas de la aplicación
const errorHandling = require("./src/error/errorHandling"); // Manejo de errores

const app = express();

// Configurar puerto desde la variable de entorno o usar el predeterminado
const PORT = process.env.PORT || 3000;
app.set("port", PORT);

// Middlewares
app.use(cors()); // Habilitar CORS
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // Permitir recibir datos en formato JSON

// Rutas
app.use("/api", routers); // Aquí estamos usando el prefijo '/api' para las rutas

// Manejo de rutas no encontradas (404)
app.use((req, res) => {
    res.status(404).json({
        error: true,
        codigo: 404,
        message: "Endpoint not found"
    });
});

// Manejo de errores generales
app.use(errorHandling);

// Iniciar el servidor
app.listen(app.get("port"), () => {
    console.log(`Server running on port ${PORT}`);
});