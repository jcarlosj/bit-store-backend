
const handleResponseSuccess = ( res, statusCode, data ) => {
    // Enviando un objeto JSON como respuesta al usuario que realizo la peticion
    res.status( statusCode ).json({
        ok: true,
        data: data
    });
}

const handleResponseError = ( res, statusCode, msg, error ) => {
    console.log(error);
    
    if( error ) {
        console.error( error );                // Mostramos el mensaje de error al desarrollador en la terminal
    }
    

    res.status( statusCode ).json({            // Enviando un objeto JSON como respuesta al usuario que realizo la peticion
        ok: false,
        msg: msg,
        errors: 'Aqui van los errores de los campos'
    }); 
}
 

module.exports = {
    handleResponseSuccess,
    handleResponseError
}

