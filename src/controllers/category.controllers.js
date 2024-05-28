const getCategories = ( req, res ) => {
    res.json({
        ok: true,
        msg: 'Obtiene todas las categorias'
    });
}

const getCategoryById = ( req, res ) => {
    res.json({
        ok: true,
        msg: 'Obtiene una categoria por ID'
    });
}

const createCategory = ( req, res ) => {
    res.json({
        ok: true,
        msg: 'Crea una categoria nueva'
    });
}

const updateCategoryById = ( req, res ) => {
    res.json({
        ok: true,
        msg: 'Actualiza una categoria por ID'
    });
}

const removeCategoryById = ( req, res ) => {
    res.json({
        ok: true,
        msg: 'Elimina un producto por ID'
    });
}


module.exports = {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategoryById,
    removeCategoryById
}