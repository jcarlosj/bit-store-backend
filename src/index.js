const express = require( 'express' );
const app = express();

/** Definir nuestras rutas o endpoints */
app.get( '/', function( req, res ) {        // ---> http://localhost:3000/
    res.send( 'Bienvenido a tu tienda virtual' );
} );
app.get( '/saludo', function( req, res ) {            // ---> http://localhost:3000/saludo
    res.send( 'Hola este es un saludo' );
} );        

/** Lanza un servidor web usando Node/Express -> http://localhost:3000 */
app.listen( 3000, function() {
    console.log( 'Server running on 3000' );
});