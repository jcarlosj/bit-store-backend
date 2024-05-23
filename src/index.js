const express = require( 'express' );
const app = express();

/** Lanza un servidor web usando Node/Express */
app.listen( 3000, function() {
    console.log( 'Server running on 3000' );
});