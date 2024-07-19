const ProductModel = require("../models/Products");

const { dbCreateProduct, dbGetProducts, dbGetProductById, dbRemoveProductById, dbUpdateProductByIdPatch, dbUpdateProductByIdPut } = require("../services/products.service");

// Obtener todos los productos
async function getProducts( req, res ) {            // ---> http://localhost:3000/api/products/
    
    try {
        const data = await dbGetProducts();

        // Enviando un objeto JSON como respuesta al usuario que realizo la peticion
        res.json({
            ok: true,
            data: data
        });
    } 
    catch ( error ) {       // Capturando la excepcion
        console.error( error );     // Mostramos el mensaje de error al desarrollador en la terminal
        res.json({                  // Enviando un objeto JSON como respuesta al usuario que realizo la peticion
            ok: false,
            msg: 'Error al obtener todos los productos'
        });   
    }

}

async function getProductById( req, res ) {
    const productId = req.params.id;

    try {
        const data = await dbGetProductById( productId );

        res.json({
            ok: true,
            data: data
        });
    } 
    catch ( error ) {
        console.error( error );
        res.json({
            ok: false,
            msg: 'Error al obtener un producto por ID'
        });
    }

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

// Actualizacion parcial del Producto
async function updateProductByIdPatch( req, res ) {
    const productId = req.params.id;                // Obteniendo el valor pasado por la URL como parametro
    const inputData = req.body;                     // Obteniendo los datos de la peticion

    try {
        const data = await dbUpdateProductByIdPatch( productId, inputData );

        res.json({
            ok: true,
            data: data
        });
    } 
    catch ( error ) {
        console.error( error );
        res.json({
            ok: false,
            msg: 'Error al actualizar parcialmente el producto por ID'
        });
    }
    
}

// Actualizacion total del Producto
async function updateProductByIdPut( req, res ) {
    const productId = req.params.id;                // Obteniendo el valor pasado por la URL como parametro
    const inputData = req.body;                     // Obteniendo los datos de la peticion

    try {
        const data = await dbUpdateProductByIdPut( productId, inputData );
    
        res.json({
            ok: true,
            data: data
        });
    } 
    catch ( error ) {
        console.error( error );
        res.json({
            ok: false,
            msg: 'Error al actualizar totalmente el producto por ID'
        });
    }

}

async function removeProductById( req, res ) {
    const productId = req.params.id;

    try {
        const data = await dbRemoveProductById( productId );

        res.json({
            ok: true,
            data: data
        });
    } 
    catch ( error ) {
        console.error( error );
        res.json({
            ok: false,
            msg: 'Error al eliminar un producto por ID'
        });
    }

}


module.exports = {
    getProducts,
    getProductById,
    createProduct,
    removeProductById,
    updateProductByIdPatch,
    updateProductByIdPut
};