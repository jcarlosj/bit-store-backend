const { sign, verify } = require( 'jsonwebtoken' );


const generateToken = ( payload ) => {
    return sign(
        payload,                    // Payload (Carga Util)
        process.env.JWT_SEED,       // PALABRA-CLAVE (Semilla)
        { expiresIn: '1h' }         // Configuracion (expiracion del token)
    );
}

const verifyToken = ( token ) => {
    return verify(
        token,                      // Token valido que envia el cliente
        process.env.JWT_SEED,       // PALABRA-CLAVE (Semilla)
    );
}

module.exports = {
    generateToken,
    verifyToken
}