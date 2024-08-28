const { verify } = require("jsonwebtoken");

const authUser = ( req, res, next ) => {
    console.log( 'Hola soy el Middleware de Autenticacion' );

    // Paso 1: Obtener el token del header de la peticion para validar que se envia
    const token = req.header( 'X-Token' );

    if( ! token ) {
        return res.status( 404 ).json({
            ok: false,
            msg: 'Error al obtener el Token'
        });
    }

    try {
        // Paso 2: Verificar autenticidad del Token
        const payload = verify(
            token,                      // Token valido que envia el cliente
            '78ih89gn#t6tr7grt97@',     // PALABRA-CLAVE (Semilla)
        );

        // Paso 3: Eliminar propiedades no requeridas en el Payload
        delete payload.iat;
        delete payload.exp;

        console.log( payload );

        next();
    } 
    catch ( error ) {
        console.error( error );
        res.json({
            ok: false,
            msg: 'Token no valido'
        });
    }

    
}


module.exports = {
    authUser
};