const ProductModel = require("../models/Products");


async function dbCreateProduct ( newProduct ) {
    // Insertando datos en la base de datos usando el Modelo Diseñado para esta Entidad
    return await ProductModel.create( newProduct );        
}

async function dbGetProducts () {
    // Obteniendo todos los datos de la base de datos usando el Modelo Diseñado para esta Entidad
    return await ProductModel.find();
}

async function dbGetProductById( id ) {
    // Obteniendo un producto por ID de la base de datos usando el Modelo Diseñado para esta Entidad
    return await ProductModel.findOne({ _id: id });
}


module.exports = {
    dbCreateProduct,
    dbGetProducts,
    dbGetProductById
}
