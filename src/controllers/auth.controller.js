const { dbGetUserByUsername } = require("../services/auth.service");


const register = async ( req, res ) => {
    // Paso 1: Obtener los datos a registrar (usuario)
    const inputData = req.body;

    res.json({
        ok: true,
        msg: 'Registra un usuario',
        data: inputData
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