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

async function dbRemoveProductById( id ) {
    // return await ProductModel.findOneAndDelete({ _id: productId });
    return await ProductModel.findByIdAndDelete( id );
}

async function dbUpdateProductByIdPatch( id, updateProduct ) {
    // return await ProductModel.findOneAndUpdate(
    //     { _id: id },                 // Objeto de consulta
    //     { $set: updateProduct },     // Estableciendo o actualizando parcialmente los campos del objeto (Producto)
    //     { new: true }                // Habilita mostrar los cambios actuales realizados al objeto
    // );
    return await ProductModel.findByIdAndUpdate(
        id,                  // Id del objeto a encontrar
        { $set: updateProduct },    // Estableciendo o actualizando parcialmente los campos del objeto (Producto)
        { new: true }               // Habilita mostrar los cambios actuales realizados al objeto
    );
}

async function dbUpdateProductByIdPut( id, updateProduct ) {
    return await ProductModel.findOneAndReplace(
        { _id: id },
        updateProduct,
        { new: true }
    );

    ProductModel.find
}


module.exports = {
    dbCreateProduct,
    dbGetProducts,
    dbGetProductById,
    dbRemoveProductById,
    dbUpdateProductByIdPatch,
    dbUpdateProductByIdPut
}
