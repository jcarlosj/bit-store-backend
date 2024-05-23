const express = require( 'express' );
const app = express();

/** Middleware */
app.use( express.static( 'views' ) );

/** Definir nuestras rutas o endpoints */
app.get( '/', function( req, res ) {        // ---> http://localhost:3000/

    res.sendFile( __dirname + '/views/index.html' );
} );
app.get( '/api/products', function( req, res ) {            // ---> http://localhost:3000/saludo
    const products = [
        { name: 'Orange', description: 'It is a fruit', price: 4, stock: 10 },
        { name: 'Apple', description: 'It is a fruit', price: 6, stock: 0 },
        { name: 'Pineapple', description: 'It is a fruit', price: 12, stock: 3 }
    ];

    res.json( products );
} );        

/** Lanza un servidor web usando Node/Express -> http://localhost:3000 */
app.listen( 3000, function() {
    console.log( 'Server running on 3000' );
});