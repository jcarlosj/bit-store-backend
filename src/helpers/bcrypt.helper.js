const { compareSync, genSaltSync, hashSync } = require( 'bcrypt' );

const verifyEncryptedPassword = ( pass, hashPass ) => {
    return compareSync(
        pass,           // Password sin encriptar de la data pura obtendida
        hashPass        // Password encriptado que viene de la BD
    );
}

const encryptedPassword = ( pass ) => {
    const salt = genSaltSync();         // Generando una cadena aleatoria para combinar
    console.log( 'salt: ', salt );

    const hashPassword = hashSync( pass, salt );    // Combinando la cadena aleatoria con el password del nuevo usuario
    console.log( 'hashPassword: ', hashPassword );

    return hashPassword;
}


module.exports = {
    verifyEncryptedPassword,
    encryptedPassword
};