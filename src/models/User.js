const { Schema, model } = require( 'mongoose' );

/** Definir la estructura de datos (nuestro documento) */
const UserSchema = new Schema({
    // Definir propiedades, atributos o campos (Documento)
    name: {
        type: String,
        required: [ true, 'El nombre del usuario es obligatorio' ]
    },
    /** username, puede ser: un correo, # identificacion, alias */
    username: {
        type: String,
        required: [ true, 'El correo del usuario es obligatorio' ],
        unique: [ true, 'El correo ya esta registrado. Solo puede registrarse con un unico correo' ]
    },
    password: {
        type: String,
        required: [ true, 'La contraseña es obligatoria' ]
    },
    role: {
        type: String,
        default: 'registered'
    }
}, {
    timestamps: true
});

/** Crear el modelo de datos a partir de la estructura de datos */
const UserModel = model( 'Users', UserSchema );


module.exports = UserModel;