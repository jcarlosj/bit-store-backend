const { handleResponseSuccess, handleResponseError } = require("../helpers/handleResponses");
const { dbGetUserByUsername } = require("../services/auth.service");


const register = async ( req, res ) => {
    // Paso 1: Obtener los datos a registrar (usuario)
    const inputData = req.body;

    try {
        // Paso 2: Verificar si el usuario existe DB ---> email
        const userFound = await dbGetUserByUsername( inputData.username );

        if( userFound ) {
            return handleResponseError( res, 404, 'El usuario a registar ya existe' );
        }

        handleResponseSuccess( res, 201, userFound );
    } 
    catch ( error ) {
        handleResponseError( res, 500, 'Error al verificar si el usuario existe', error );
    }
    
}

const login = ( req, res ) => {
    res.json({
        ok: true,
        msg: 'Autentica un usuario'
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