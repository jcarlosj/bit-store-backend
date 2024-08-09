const { Router } = require( 'express' );
const { register, login, reNewToken } = require('../controllers/auth.controller');

const router = Router();

/** Definir todas las rutas de la API para la data de productos */
// http://localhost:3000/api/auth
router.post( '/register', register );           // http://localhost:3000/api/auth/register
router.post( '/login', login );                 // http://localhost:3000/api/auth/login
router.get( '/re-new-token', reNewToken );      // http://localhost:3000/api/auth/re-new-token


module.exports = router;
