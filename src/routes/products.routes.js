const { Router } = require( 'express' );
const { getProducts } = require('../controllers/products.controller');
const router = Router();

/** Definir todas las rutas de la API para la data de productos */
// http://localhost:3000/api/products/<id-hash> 
router.get( '/', getProducts );                 // Obtiene todos los productos
router.get( '/:id', function( req, res ) {      // Obtiene un producto por ID
    res.json({
        ok: true,
        msg: 'Obtiene un producto por ID'
    });
} );
router.post( '/', function( req, res ) {        // Crear un nuevo producto
    res.json({
        ok: true,
        msg: 'Crea un nuevo producto'
    });
} );
router.put( '/:id', function( req, res ) {      // Actualiza un producto completamente por ID
    res.json({
        ok: true,
        msg: 'Actualiza el producto por ID, actualizando todas sus representaciones'
    });
} );
router.patch( '/:id', function( req, res ) {    // Actualiza un producto parcialmente por ID
    res.json({
        ok: true,
        msg: 'Actualiza el producto por ID, actualizando parcialmente sus representaciones'
    });
} );
router.delete( '/:id', function( req, res ) {   // Elimina un producto por ID
    res.json({
        ok: true,
        msg: 'Elimina el producto por ID'
    });
} );



module.exports = router;
