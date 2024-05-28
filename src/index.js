const express = require( 'express' );
const app = express();

/** Middleware */
app.use( express.static( 'views' ) );

/** Definir nuestras rutas o endpoints */
app.use( '/', require( './routes/pages.routes' ) );                         // http://localhost:3000/
app.use( '/api/products', require( './routes/products.routes' ) );          // http://localhost:3000/api/products  
app.use( '/api/categories', require( './routes/categories.routes' )  );     // http://localhost:3000/api/categories

/** Lanza un servidor web usando Node/Express -> http://localhost:3000 */
app.listen( 3000, function() {
    console.log( 'Server running on 3000' );
});