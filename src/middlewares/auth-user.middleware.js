const { handleResponseError } = require("../helpers/handleResponses");
const { verifyToken } = require("../helpers/jwt.helper");


const authUser = ( req, res, next ) => {
    console.log( 'Hola soy el Middleware de Autenticacion' );

    // Paso 1: Obtener el token del header de la peticion para validar que se envia
    const token = req.header( 'X-Token' ); 

    if( ! token ) {
        return handleResponseError( res, 404, 'Error al obtener el Token' );
    }

    try {
        // Paso 2: Verificar autenticidad del Token
        const payload = verifyToken( token );

        // Paso 3: Eliminar propiedades no requeridas en el Payload
        delete payload.iat;
        delete payload.exp;

        req.authUser = payload;
        // console.log( req );

        next();
    } 
    catch ( error ) {
        handleResponseError( res, 500, 'Token no valido', error );
    }
    
}


module.exports = {
    authUser
};