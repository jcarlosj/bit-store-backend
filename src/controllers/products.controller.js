const { handleResponseSuccess, handleResponseError } = require("../helpers/handleResponses");
const ProductModel = require("../models/Products");

const { dbCreateProduct, dbGetProducts, dbGetProductById, dbRemoveProductById, dbUpdateProductByIdPatch, dbUpdateProductByIdPut, dbGetPaginatedProducts } = require("../services/products.service");

// Obtener todos los productos
async function getProducts( req, res ) {            // ---> http://localhost:3000/api/products/
    
    try {
        const data = await dbGetProducts();

        handleResponseSuccess( res, 200, data );
    } 
    catch ( error ) {       // Capturando la excepcion
        handleResponseError( res, 500, 'Error al obtener todos los productos', error  );   
    }

}

// Obtener todos los productos paginados
async function getPaginatedProducts( req, res ) {
    const 
        payload = req.authUser,
        category = req.params.category,
        page = parseInt( req.params.page ) || 1,
        pageSize = parseInt( req.params.pageSize ) || 10;

    const filter = {};
    if( category !== 'all' ) {
        filter.category = category;     // { category: 'electronica' }
    }
    if( payload ) {
        filter.userId = payload.id;     // { userId: '66c63a200b72372eec9e13ff' }
    }

    // { category: 'electronica', userId: '66c63a200b72372eec9e13ff' }

    try {
        const data = await dbGetPaginatedProducts( page, pageSize, filter );

        console.log( page, pageSize, data );

        handleResponseSuccess( res, 200, { page, pageSize, data })
    
    } 
    catch ( error ) {
        handleResponseError( res, 500, 'Error al obtener todos los productos', error );
    }
    
}

async function getProductById( req, res ) {
    const productId = req.params.id;

    try {
        const data = await dbGetProductById( productId );

        if( ! data ) {
            return handleResponseError( res, 404, 'Producto no encontrado' );
        }

        handleResponseSuccess( res, 200, data );
    } 
    catch ( error ) {
        handleResponseError( res, 500, 'Error al obtener un producto por ID', error );
    }

}

// Crear un nuevo producto
async function createProduct( req, res ) {        
    const inputData = req.body;                     // Obteniendo los datos de la peticion
    const payload = req.authUser;                   // Obteniendo el payload del Token

    console.log( '>>>> ', payload );

    inputData.userId = payload.id;
    // console.log( '>> inputData >>', inputData );

    try {
        const data = await dbCreateProduct( inputData );
        // console.log( '>> data >>', data );

        handleResponseSuccess( res, 201, data );
    } 
    catch ( error ) {       // Capturando la excepcion
        handleResponseError( res, 500, 'Error al crear un producto nuevo', error );
    }

}

// Actualizacion parcial del Producto
async function updateProductByIdPatch( req, res ) {
    const productId = req.params.id;                // Obteniendo el valor pasado por la URL como parametro
    const inputData = req.body;                     // Obteniendo los datos de la peticion

    try {
        const data = await dbUpdateProductByIdPatch( productId, inputData );

        if( ! data ) {
            return handleResponseError( res, 404, 'Producto no encontrado' );
        }

        handleResponseSuccess( res, 200, data );
    } 
    catch ( error ) {
        handleResponseError( res, 500, 'Error al actualizar parcialmente el producto por ID', error );
    }
    
}

// Actualizacion total del Producto
async function updateProductByIdPut( req, res ) {
    const productId = req.params.id;                // Obteniendo el valor pasado por la URL como parametro
    const inputData = req.body;                     // Obteniendo los datos de la peticion

    try {
        const data = await dbUpdateProductByIdPut( productId, inputData );

        if( ! data ) {
            return handleResponseError( res, 404, 'Producto no encontrado' );
        }
    
        handleResponseSuccess( res, 200, data );
    } 
    catch ( error ) {
        handleResponseError( res, 500, 'Error al actualizar totalmente el producto por ID', error );
    }

}

async function removeProductById( req, res ) {
    const productId = req.params.id;

    try {
        const data = await dbRemoveProductById( productId );

        if( ! data ) {
            return handleResponseError( res, 404, 'Producto no encontrado' );
        }

        handleResponseSuccess( res, 200, data );
    } 
    catch ( error ) {
        handleResponseError( res, 500, 'Error al eliminar un producto por ID', error );
    }

}


module.exports = {
    getProducts,
    getPaginatedProducts,
    getProductById,
    createProduct,
    removeProductById,
    updateProductByIdPatch,
    updateProductByIdPut
};