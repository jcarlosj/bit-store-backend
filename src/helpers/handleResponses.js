
const handleResponseSuccess = ( res, statusCode, data ) => {
    // Enviando un objeto JSON como respuesta al usuario que realizo la peticion
    res.status( statusCode ).json({
        ok: true,
        data: data
    });
}
 

module.exports = {
    handleResponseSuccess
}

