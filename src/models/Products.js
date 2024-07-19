const mongoose = require( 'mongoose' );
 
/** Definir la estructura de datos (nuestro documento) */
const ProductSchema = new mongoose.Schema({
    // Definir propiedades, atributos o campos (Documento)
    name: {
        type: String,
        required: [ true, 'El nombre del producto es obligatorio.' ]
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: [ true, 'El precio es obligatorio.' ],
        min: [ 0, 'El precio no puede ser negativo.' ]
    },
    quantity: {
        type: Number,
        required: [ true, 'La cantidad es obligatoria.' ],
        min: [ 1, 'La cantidad minima a registrar es de 1.' ]
    },
    category: {
        type: String,
        required: [ true, 'La categoria es obligatoria' ],
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
