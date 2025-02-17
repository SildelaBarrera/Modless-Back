const { password } = require ('../src/passwords')

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: password,
    database: "tienda_online",
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0
});

console.log("Conexión con la BBDD creada");

module.exports = { pool };
