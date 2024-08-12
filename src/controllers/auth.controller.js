const { compareSync } = require( 'bcrypt' );
const { sign } = require( 'jsonwebtoken' );

const { handleResponseSuccess, handleResponseError } = require("../helpers/handleResponses");
const { dbGetUserByUsername, registerUser } = require("../services/auth.service");


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

    // Paso 2: Verificar si el usuario existe DB ---> email
    const userFound = await dbGetUserByUsername( inputData.username );

    if( ! userFound ) {
        res.status( 404 ).json({
            ok: false,
            msg: 'El usuario no esta registrado. Por favor registrese!'
        });
    } 

    // Paso 3: Confirmar si la contraseña es correcta 
    const isValidPassword = compareSync(
        inputData.password,     // Password sin encriptar de la data pura obtendida
        userFound.password      // Password encriptado que viene de la BD
    );

    if( ! isValidPassword ) {
        return res.status( 404 ).json({
            ok: false,
            msg: 'Contraseña invalida'
        });
    }
    
    // Paso 4: Generar una autenticación pasiva (TOKEN)
    const payload = {
        username: userFound.username,
        name: userFound.name,
        role: userFound.role
    };

    const token = sign(
        payload,                    // Payload (Carga Util)
        '78ih89gn#t6tr7grt97@',     // PALABRA-CLAVE (Semilla)
        { expiresIn: '1h' }         // Configuracion (expiracion del token)
    );


    // Paso 5: Responder al cliente enviandole el Token
    res.status( 200 ).json({
        ok: true,
        msg: 'Autentica un usuario',
        token: token
    });
}

const reNewToken = ( req, res ) => {
    res.json({
        ok: true,
        msg: 'Actualiza el Token del usuario logueado'
    });
}


module.exports = {
    register,
    login,
    reNewToken
};