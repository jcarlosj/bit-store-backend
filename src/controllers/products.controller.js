const ProductModel = require("../models/Products");


function getProducts( req, res ) {            // ---> http://localhost:3000/api/products/
    const products = [
        { name: 'Orange', description: 'It is a fruit', price: 4, stock: 10 },
        { name: 'Apple', description: 'It is a fruit', price: 6, stock: 0 },
        { name: 'Pineapple', description: 'It is a fruit', price: 12, stock: 3 },
        // { name: 'Lemon', description: 'It is a fruit', price: 1, stock: 300 }
    ];

    res.json( products );
}

function getProductById( req, res ) {
    res.json({
        ok: true,
        msg: 'Obtiene un producto por ID'
    });
}

async function createProduct( req, res ) {        // Crear un nuevo producto
    const inputData = req.body;
    console.log( '>> inputData >>', inputData );

    const data = await ProductModel.create( inputData );       // Insertando datos en la base de datos
    console.log( '>> data >>', data );

    res.json({
        ok: true,
        data: data
    });
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