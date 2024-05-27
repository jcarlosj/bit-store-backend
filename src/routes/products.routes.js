const { Router } = require( 'express' );
const router = Router();

/** Definir todas las rutas de la API para la data de productos */
router.get( '/', function( req, res ) {            // ---> http://localhost:3000/api/products/
    const products = [
        { name: 'Orange', description: 'It is a fruit', price: 4, stock: 10 },
        { name: 'Apple', description: 'It is a fruit', price: 6, stock: 0 },
        { name: 'Pineapple', description: 'It is a fruit', price: 12, stock: 3 },
        { name: 'Lemon', description: 'It is a fruit', price: 1, stock: 300 }
    ];

    res.json( products );
} );


module.exports = router;
