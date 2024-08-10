const { genSaltSync, hashSync } = require( 'bcrypt' );
const UserModel = require("../models/User");

const dbGetUserByUsername = async ( email ) => {

    return await UserModel.findOne({ username: email });
}

const registerUser = async ( newUser ) => {

    console.log( 'Data Pura: ', newUser );

    // Paso 1: Creamos un objecto (dbUser) de la clase UserModel y le pasamos la data pura
    const dbUser = new UserModel( newUser );
    console.log( 'Data procesada por la clase UserModel: ', dbUser );

    // Paso 2: Encriptar la contraseña
    const salt = genSaltSync();         // Generando una cadena aleatoria para combinar
    console.log( 'salt: ', salt );

    const hashPassword = hashSync( newUser.password, salt );    // Combinando la cadena aleatoria con el password del nuevo usuario
    console.log( 'hashPassword: ', hashPassword );

    dbUser.password = hashPassword;        // Actualizando la propiedad 'password' en el objeto (dbUser)
    console.log( 'Data procesada por la clase UserModel: ', dbUser );

    // Paso 3: Guarda en la Base de datos y retorna los datos del documento registrado
    return await dbUser.save();           
}


module.exports = {
    dbGetUserByUsername,
    registerUser
};