const express = require( 'express' );
const app = express();

/** Definir nuestras rutas o endpoints */
app.get( '/', function( req, res ) {        // ---> http://localhost:3000/
    const template = `
        <h1>Home page</h1>
        <p>Bienvido a nuestra tienda virtual. Disfruta de todos nuestros descuentos</p>
        <p>Uno de nuestros mejores aliados es <a href="https://amazon.com">Amazon</a></p>
    `;

    res.send( template );
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