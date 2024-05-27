const { Router } = require( 'express' );
const { getProducts } = require('../controllers/products.controller');
const router = Router();

/** Definir todas las rutas de la API para la data de productos */
router.get( '/', getProducts );


module.exports = router;
