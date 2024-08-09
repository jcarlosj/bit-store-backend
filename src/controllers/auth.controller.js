const register = ( req, res ) => {
    res.json({
        ok: true,
        msg: 'Registra un usuario'
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