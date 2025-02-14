const express = require("express");
const cors = require("cors");
const routers = require("./src/routers/routers");
const errorHandling = require("./src/error/errorHandling");

const app = express();

app.set("port", process.env.PORT || 3000);

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(routers);

app.use((req, res) => {
    res.status(404).json({
        error: true,
        codigo: 404,
        message: "Endpoint not found"
    });
});

// Manejo de errores generales
app.use(errorHandling);

app.listen(app.get("port"), () => {
    console.log(`Server running on port ${app.get("port")}`);
});