const path = require( 'path' );
const { Router } = require( 'express' );
const router = Router();

/** Definir todas las rutas de navegacion de las paginas estaticas */
router.get( '/', function( req, res ) {        // ---> http://localhost:3000/

    // console.log( '>>>>', path.join( __dirname, '../views/index.html' ) );
    res.sendFile( path.join( __dirname, '../views/index.html' ) );
} );


module.exports = router;