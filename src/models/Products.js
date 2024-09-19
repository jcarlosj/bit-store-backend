const mongoose = require( 'mongoose' );
 
/** Definir la estructura de datos (nuestro documento) */
const ProductSchema = new mongoose.Schema({
    // Definir propiedades, atributos o campos (Documento)
    reference: {
        type: String,
        required: [ true, 'La referencia del producto es obligatoria' ],
        minlength: [ 8, 'La referencia debe tener al menos 8 caracteres' ],
        maxlength: [ 15, 'La referencia no puede exceder los 15 caracteres' ]
    },
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
    urlImage: {
        type: String
    },
    state: {
        type: Boolean,
        default: true
    },
    userId: {
        type: String,
        required: [ true, 'El id del usuario que registra el producto es requerido' ]
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CategoryModel'
    }
    // creationDate: {
    //     type: Date,
    //     default: Date.now()
    // }
}, {
    timestamps: true
});

// Define o Forza la creación de un índice único ( reference, reference-1, reference_1 )
ProductSchema.index({ reference: 1 }, { unique: true });

ProductSchema.pre( [ 'findOneAndUpdate', 'findByIdAndUpdate' ], function() {
    
    /** Obtiene el objeto de actualizacion que se aplicara al documento en BD */
    const update = this.getUpdate();

    /** Valida si el objeto de actualizacion contiene el propiedad __v */
    if (update.__v != null) {
        delete update.__v;      // Elimina la propiedad __v
    }

    /** Definiendo las operaciones de actualizacion que deben ser revisados en la consulta */
    const keys = ['$set', '$setOnInsert'];
    
    /** Iterar cada una de las propiedades el objeto de consulta  */
    for (const key of keys) {

        /** Valida si la operacion de actualizacion ($set, $setOnInsert) existen en la consulta y contiene __v */
        if (update[key] != null && update[key].__v != null) {
        
            delete update[key].__v;         // Elimina la propiedad __v

            /** Valida si despues de eliminar __v, el campo esta vacio */
            if ( Object.keys(update[key]).length === 0 ) {
                delete update[key];         // Elimina la propiedad respectica
            }
        }
    }

    update.$inc = update.$inc || {};        // Inicializa $inc si no existe
    update.$inc.__v = 1;                    // Incrementar la version del documento en 1 en la propiedad __v
});

ProductSchema.pre( 'findOneAndReplace', async function() {
    
    // Obtener el documento actual antes de reemplazarlo
    const doc = await this.model.findById(this.getQuery()._id);
    if (!doc) return;

    // Obtener el nuevo documento que reemplazará al antiguo
    const replacement = this.getUpdate();

    // Asegurarse de que `__v` no esté presente en el documento de reemplazo
    if (replacement.__v != null) {
        delete replacement.__v;
    }

    // Incrementar la versión del documento
    replacement.__v = doc.__v + 1;
    
    // Actualizar el objeto de reemplazo con la nueva versión
    this.setUpdate(replacement);
});


/** Crear el modelo de datos a partir de la estructura de datos */
const ProductModel = mongoose.model(
    'Products',     // Nombre de la coleccion a la que vamos a asociar nuestra estructura de datos
    ProductSchema   // Estructura de datos para los documentos de esta coleccion
);


// Funcion que Crea los indices definidos con index
const ensureIndexes = () => {
    ProductModel.createIndexes()
        .then( () => { 
            console.log( 'Indices asegurados en el modelo ProductModel' );
        } )
        .catch( ( error ) => { 
            console.error( 'Error al aserurar la creación de los indices', error );
        } );
}


module.exports = {
    ProductModel,
    ensureIndexes
};
