const { Router } = require( 'express' );
const { homePage } = require('../controllers/pages.controllers');
const router = Router();

/** Definir todas las rutas de navegacion de las paginas estaticas */
router.get( '/', homePage );


module.exports = router;