const express = require( 'express' );
const { dbConnection } = require('./config/mongo.config');
const app = express();
const PORT = process.env.PORT;

/** Middleware */
app.use( express.static( 'views' ) );
app.use( express.json() );      // Ampliamos la capacidad de interpretar y entender JSON

/** Definir nuestras rutas o endpoints */
app.use( '/', require( './routes/pages.routes' ) );                         // http://localhost:3000/
app.use( '/api/products', require( './routes/products.routes' ) );          // http://localhost:3000/api/products  
app.use( '/api/categories', require( './routes/categories.routes' ) );      // http://localhost:3000/api/categories
app.use( '/api/auth', require( './routes/auth.routes' ) );                  // http://localhost:3000/api/auth

/** Invocar la conexion a nuestra base datos MongoDB usando Mongoose */
dbConnection();


/** Lanza un servidor web usando Node/Express -> http://localhost:3000 */
app.listen( PORT, function() {
    console.log( `Server running on http://localhost:${ PORT }` );
});