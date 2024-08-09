const { dbGetUserByUsername } = require("../services/auth.service");


const register = async ( req, res ) => {
    // Paso 1: Obtener los datos a registrar (usuario)
    const inputData = req.body;

    // Paso 2: Verificar si el usuario existe DB ---> email
    const userFound = await dbGetUserByUsername( inputData.username );

    if( userFound ) {
        return res.status( 404 ).json({
            ok: false,
            msg: 'El usuario a registar ya existe'
        });
    }

    res.json({
        ok: true,
        msg: 'Registra un usuario',
        data: userFound
    });
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