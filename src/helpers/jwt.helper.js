const { sign } = require( 'jsonwebtoken' );


const generateToken = ( payload ) => {
    return sign(
        payload,                    // Payload (Carga Util)
        '78ih89gn#t6tr7grt97@',     // PALABRA-CLAVE (Semilla)
        { expiresIn: '1h' }         // Configuracion (expiracion del token)
    );
}

module.exports = {
    generateToken
}