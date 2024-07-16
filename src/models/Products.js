const mongoose = require( 'mongoose' );
 
/** Definir la estructura de datos (nuestro documento) */
const ProductSchema = new mongoose.Schema({
    // Definir propiedades, atributos o campos (Documento)
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        default: 0
    },
    quantity: {
        type: Number,
        default: 1,
        required: true
    },
    category: {
        type: String,
        required: true,
        default: 'non-category'
    },
    urlImage: {
        type: String
    },
    state: {
        type: Boolean,
        default: true
    }
});

/** Crear el modelo de datos a partir de la estructura de datos */
const ProductModel = mongoose.model(
    'Products',     // Nombre de la coleccion a la que vamos a asociar nuestra estructura de datos
    ProductSchema   // Estructura de datos para los documentos de esta coleccion
);


module.exports = ProductModel;
