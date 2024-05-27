const path = require( 'path' );

function homePage( req, res ) {        // ---> http://localhost:3000/

    // console.log( '>>>>', path.join( __dirname, '../views/index.html' ) );
    res.sendFile( path.join( __dirname, '../views/index.html' ) );
}


module.exports = { homePage };