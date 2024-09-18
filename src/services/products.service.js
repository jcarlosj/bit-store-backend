const { ProductModel } = require("../models/Products");


async function dbCreateProduct ( newProduct ) {
    // Insertando datos en la base de datos usando el Modelo Diseñado para esta Entidad
    return await ProductModel.create( newProduct );        
}

async function dbGetProducts () {
    // Obteniendo todos los datos de la base de datos usando el Modelo Diseñado para esta Entidad
    return await ProductModel.find({});
}

async function dbGetPaginatedProducts ( page, pageSize, filter ) {
    return await ProductModel.find( filter )
        .skip( ( page - 1 ) * pageSize )
        .limit( pageSize )
        .sort({ createAt: -1 });

        //  ( page - 1 ) * pageSize
        // ( 1 - 1 ) * 6  ---> 0
        // ( 2 - 1 ) * 6  ---> 6
        // ( 3 - 1 ) * 6  ---> 12
        // ( 4 - 1 ) * 6  ---> 18

    // Productos   1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20
    // Paginas     1                 2                     3                       4
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
        { $set: updateProduct },                // Estableciendo o actualizando parcialmente los campos del objeto (Producto)
        { new: true, runValidators: true }      // Habilita mostrar los cambios actuales realizados al objeto
    );
}

async function dbUpdateProductByIdPut( id, updateProduct ) {
    return await ProductModel.findOneAndReplace(
        { _id: id },
        updateProduct,
        { new: true, runValidators: true }
    );
}

module.exports = {
    dbCreateProduct,
    dbGetProducts,
    dbGetPaginatedProducts,
    dbGetProductById,
    dbRemoveProductById,
    dbUpdateProductByIdPatch,
    dbUpdateProductByIdPut
}
