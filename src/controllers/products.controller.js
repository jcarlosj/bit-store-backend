const { handleResponseSuccess, handleResponseError } = require("../helpers/handleResponses");
const ProductModel = require("../models/Products");

const { dbCreateProduct, dbGetProducts, dbGetProductById, dbRemoveProductById, dbUpdateProductByIdPatch, dbUpdateProductByIdPut } = require("../services/products.service");

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
    // console.log( '>> inputData >>', inputData );

    try {
        const data = await dbCreateProduct( inputData );
        // console.log( '>> data >>', data );

        handleResponseSuccess( res, 201, data );
    } 
    catch ( error ) {       // Capturando la excepcion

        const errors = {};  // Define el objeto donde se almacenaran los mensajes de error por cada propiedad del Modelo que infrinjamos

        /** Validamos si existen errores de validacion */
        if( error.name === 'ValidationError' ) {

            /** Iteramos el objeto de errores por su nombre de propiedad */
            for( let property in error.errors ) {
                // console.info( '--->>> ', property );
                errors[ property ] = error.errors[ property ].message;      // Asignamos el mensaje de error a la respectiva propiedad en el objeto errors
            }

            // console.error( errors );
        }

        console.error( error );     // Mostramos el mensaje de error al desarrollador en la terminal
        res.status( 500 ).json({                  // Enviando un objeto JSON al usuario que realizo la peticion
            ok: false,
            msg: 'Error al crear un producto nuevo',
            errors: errors
        });
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
        const errors = {};  // Define el objeto donde se almacenaran los mensajes de error por cada propiedad del Modelo que infrinjamos

        /** Validamos si existen errores de validacion */
        if( error.name === 'ValidationError' ) {

            /** Iteramos el objeto de errores por su nombre de propiedad */
            for( let property in error.errors ) {
                // console.info( '--->>> ', property );
                errors[ property ] = error.errors[ property ].message;      // Asignamos el mensaje de error a la respectiva propiedad en el objeto errors
            }

            // console.error( errors );
        }

        console.error( error );
        res.status( 500 ).json({
            ok: false,
            msg: 'Error al actualizar parcialmente el producto por ID',
            errors: errors
        });
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
        const errors = {};  // Define el objeto donde se almacenaran los mensajes de error por cada propiedad del Modelo que infrinjamos

        /** Validamos si existen errores de validacion */
        if( error.name === 'ValidationError' ) {

            /** Iteramos el objeto de errores por su nombre de propiedad */
            for( let property in error.errors ) {
                // console.info( '--->>> ', property );
                errors[ property ] = error.errors[ property ].message;      // Asignamos el mensaje de error a la respectiva propiedad en el objeto errors
            }

            // console.error( errors );
        }

        console.error( error );
        res.status( 500 ).json({
            ok: false,
            msg: 'Error al actualizar totalmente el producto por ID',
            errors: errors
        });
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
    getProductById,
    createProduct,
    removeProductById,
    updateProductByIdPatch,
    updateProductByIdPut
};