const  { pool }= require('../database');

// const getProducts = async (request, response) => {
//     try {
//         let sql;
//         let params;
//         sql = "SELECT p.id_product, p.name, p.price, c.color, " +
//         "(SELECT vi.image FROM variants_image vi WHERE vi.id_variant = vp.id_variant LIMIT 1) AS image "+
//         "FROM products p JOIN variants_products vp ON p.id_product = vp.id_product "+
//         "JOIN colors c ON vp.id_color = c.id_color ORDER BY p.id_product, c.color "
        
//         const [result] = await pool.query(sql, params);

//         const respuesta = {
//             error: false,
//             codigo: 200,
//             message: "These are the items",
//             data: result
//         };
//         console.log(respuesta.data)
//             response.send(respuesta.data);
        
//     } catch (error) {
//         console.log(error);
//         response.status(500).send({ error: true, message: "Internal server error", details: error.message });
//     }
// };
const getProducts = async (request, response) => {
    try {
        let { category } = request.query; // Obtener categoría desde la URL
        let sql;
        let params = [];

        sql = `SELECT p.id_product, p.name, p.price, c.color, p.category,
                  (SELECT vi.image FROM variants_image vi WHERE vi.id_variant = vp.id_variant LIMIT 1) AS image
                  FROM products p 
                  JOIN variants_products vp ON p.id_product = vp.id_product 
                  JOIN colors c ON vp.id_color = c.id_color`;

        if (category) {
            sql += " WHERE p.category = ?";
            params.push(category);
        }

        sql += " ORDER BY p.id_product, c.color";

        const [result] = await pool.query(sql, params);

        const respuesta = {
            error: false,
            codigo: 200,
            message: "These are the items",
            data: result
        };

        console.log(respuesta.data);
        response.send(respuesta.data);
        
    } catch (error) {
        console.log(error);
        response.status(500).send({ error: true, message: "Internal server error", details: error.message });
    }
};

const getProductById = async (request, response) => {
    try {
        const { id_product } = request.params;  // Recibimos el id_product desde los parámetros de la URL

        const sql = `
            SELECT 
                p.id_product, 
                p.name, 
                p.price, 
                c.color, 
                s.size, 
                st.stock
            FROM 
                products p
            JOIN 
                variants_products vp ON p.id_product = vp.id_product
            JOIN 
                colors c ON vp.id_color = c.id_color
            JOIN 
                sizes s ON vp.id_size = s.id_size
            JOIN 
                stock st ON vp.id_variant = st.id_variant
            WHERE 
                p.id_product = ?
        `;

        const [result] = await pool.query(sql, [id_product]);

        if (result.length === 0) {
            return response.status(404).send({ error: true, message: "Product not found" });
        }

        const respuesta = {
            error: false,
            codigo: 200,
            message: "Product details retrieved successfully",
            data: result
          };
      
          response.status(200).json(respuesta);
     
    } catch (error) {
        console.error(error);
        response.status(500).send({ error: true, message: "Internal server error", details: error.message });
    }
};
module.exports = { getProducts, getProductById };