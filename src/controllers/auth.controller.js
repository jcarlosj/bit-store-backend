const { handleResponseSuccess, handleResponseError } = require("../helpers/handleResponses");
const { dbGetUserByUsername, registerUser } = require("../services/auth.service");
const { generateToken } = require('../helpers/jwt.helper');
const { verifyEncryptedPassword } = require('../helpers/bcrypt.helper');
const { verify, sign } = require( 'jsonwebtoken' );


const register = async ( req, res ) => {
    // Paso 1: Obtener los datos a registrar (usuario)
    const inputData = req.body;

    try {
        // Paso 2: Verificar si el usuario existe DB ---> email
        const userFound = await dbGetUserByUsername( inputData.username );

        if( userFound ) {
            return handleResponseError( res, 404, 'El usuario a registar ya existe' );
        }

        // Paso 3: Si no existe el usuario, entonces registre el nuevo usuario
        const data = await registerUser( inputData );

        // Paso Opcional: General Token con usuario registrado 'data'

        // Paso 4: Responder al cliente, si el usuario a sido registrado (Opcional enviar el Token para acceder al sistema)
        handleResponseSuccess( res, 201, data );
    } 
    catch ( error ) {
        handleResponseError( res, 500, 'Error al verificar y registrar el usuario existe', error );
    }
    
}

const login = async ( req, res ) => {
    // Paso 1: Obtener los datos para autenticar el usuario (username, password)
    const inputData = req.body;

    try {
        // Paso 2: Verificar si el usuario existe DB ---> email
        const userFound = await dbGetUserByUsername( inputData.username );

        if( ! userFound ) {
            return handleResponseError( res, 404, 'El usuario no esta registrado. Por favor registrese!' );
        } 

        // Paso 3: Confirmar si la contraseña es correcta 
        const isValidPassword = verifyEncryptedPassword( inputData.password, userFound.password );

        if( ! isValidPassword ) {
            return handleResponseError( res, 404, 'Contraseña invalida' );
        }
        
        // Paso 4: Generar una autenticación pasiva (TOKEN)
        const token = generateToken({
            id: userFound._id,
            username: userFound.username,
            name: userFound.name,
            role: userFound.role
        });

        // Paso 5: Responder al cliente enviandole el Token
        handleResponseSuccess( res, 200, token );
    } 
    catch ( error ) {
        handleResponseError( res, 500, 'Error al autenticar el usuario', error );
    }

}

const reNewToken = ( req, res ) => {
    
    const payload = req.authUser;

    try {
        // Paso 1: Renovar el Token
        const newToken = generateToken( payload );
        // console.log( payload );

        // Paso 2: Reenviar el token nuevo al cliente 
        handleResponseSuccess( res, 200, newToken );
    } 
    catch ( error ) {
        handleResponseError( res, 500, 'Token no valido', error );
    }

}


module.exports = {
    register,
    login,
    reNewToken
};