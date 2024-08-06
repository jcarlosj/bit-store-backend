const mongoose = require( 'mongoose' );
const { ensureIndexes } = require('../models/Products');


const dbConnection = async () => {
    try {
        await mongoose.connect( 'mongodb://localhost:27017/db_shop', {} );  
        
        console.log( 'Base de datos inicializado exitosamente' );

        await ensureIndexes();
    } 
    catch ( error ) {
        console.error( error );
        throw new Error( 'Error al inicializar la base datos' );
    }
}


module.exports = {
    dbConnection
}