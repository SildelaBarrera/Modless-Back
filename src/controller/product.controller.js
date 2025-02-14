const  { pool }= require('../database');

const getProducts = async (request, response) => {
    try {
        let sql;
        let params;
        sql = "SELECT DISTINCT p.id_product, p.name, p.price, c.color FROM products p " +
        "JOIN variantes_products vp ON p.id_product = vp.id_product " +
        "JOIN colors c ON vp.id_color = c.id_color " +
        "ORDER BY p.id_product, c.color ";
        
        const [result] = await pool.query(sql, params);

        const respuesta = {
            error: false,
            codigo: 200,
            message: "These are the items",
            data: result
        };
            response.send(respuesta.data);
        
    } catch (error) {
        console.log(error);
        response.status(500).send({ error: true, message: "Internal server error", details: error.message });
    }
};

module.exports = { getProducts };