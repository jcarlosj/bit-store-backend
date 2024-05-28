const { Router } = require( 'express' );
const { getCategories, getCategoryById, createCategory, removeCategoryById, updateCategoryById } = require('../controllers/category.controllers');
const router = Router();

/** Definir todas las rutas de la API para la data de categorias */
// http://localhost:3000/api/categories
router.get( '/', getCategories );               // Obtener todas las categorias
router.get( '/:id', getCategoryById );          // Obtener una categoria por ID
router.post( '/', createCategory );             // Crear una categoria
router.put( '/:id', updateCategoryById );       // Actualizar una categoria totalmente
router.patch( '/:id', updateCategoryById );     // Actualizar una categoria parcialmente
router.delete( '/:id', removeCategoryById );    // Eliminar una categoria por ID


module.exports = router;