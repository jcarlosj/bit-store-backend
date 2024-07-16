const ProductModel = require("../models/Products");

const { dbCreateProduct } = require("../services/products.service");


async function getProducts( req, res ) {            // ---> http://localhost:3000/api/products/
    const data = await ProductModel.find();

    res.json({
        ok: true,
        data: data
    });
}

function getProductById( req, res ) {
    res.json({
        ok: true,
        msg: 'Obtiene un producto por ID'
    });
}

// Crear un nuevo producto
async function createProduct( req, res ) {        
    const inputData = req.body;                     // Obteniendo los datos de la peticion
    // console.log( '>> inputData >>', inputData );

    try {
        const data = await dbCreateProduct( inputData );
        // console.log( '>> data >>', data );

        // Enviando un objeto JSON como respuesta al usuario que realizo la peticion
        res.json({
            ok: true,
            data: data
        });
    } 
    catch ( error ) {       // Capturando la excepcion
        console.error( error );     // Mostramos el mensaje de error al desarrollador en la terminal
        res.json({                  // Enviando un objeto JSON al usuario que realizo la peticion
            ok: false,
            msg: 'Error al crear un producto nuevo'
        });
    }

}

function updateProductById( req, res ) {
    res.json({
        ok: true,
        msg: 'Actualiza el producto pr ID, actualizando todas sus representaciones'
    });
}

function removeProductById( req, res ) {
    res.json({
        ok: true,
        msg: 'Elimina el producto por ID'
    });
}


module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProductById,
    removeProductById
};