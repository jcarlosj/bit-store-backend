const ProductModel = require("../models/Products");

async function dbCreateProduct ( newProduct ) {
    // Insertando datos en la base de datos usando el Modelo Diseñado para esta Entidad
    return await ProductModel.create( newProduct );        
}

module.exports = {
    dbCreateProduct
}
