const { Router } = require( 'express' );

const router = Router();

/** Definir todas las rutas de la API para la data de productos */
// http://localhost:3000/api/auth
router.post( '/register', ( req, res ) => {         // http://localhost:3000/api/auth/register
    res.json({
        ok: true,
        msg: 'Registra un usuario'
    });
});

router.post( '/login', ( req, res ) => {            // http://localhost:3000/api/auth/login
    res.json({
        ok: true,
        msg: 'Loguea un usuario'
    })
});

router.get( '/re-new-token', ( req, res ) => {      // http://localhost:3000/api/auth/re-new-token
    res.json({
        ok: true,
        msg: 'Se renueva la autenticacion del usuario'
    });
});


module.exports = router;
