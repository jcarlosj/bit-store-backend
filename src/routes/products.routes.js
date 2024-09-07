const { Router } = require( 'express' );
const { getProducts, getProductById, createProduct, removeProductById, updateProductByIdPatch, updateProductByIdPut, getPaginatedProducts } = require('../controllers/products.controller');
const { authUser } = require('../middlewares/auth-user.middleware');
const router = Router();

/** Definir todas las rutas de la API para la data de productos */
// http://localhost:3000/api/products/<id-hash> 
router.get( '/all', getProducts );                          // Obtiene todos los productos
router.get( '/:id', getProductById );                       // Obtener un producto por ID
router.get( '/:page/:pageSize', getPaginatedProducts );     // Obtener todos los productos paginados


router.post( '/', authUser, createProduct );              // Crea un nuevo producto
router.put( '/:id', authUser, updateProductByIdPut );     // Actualiza todo el producto por ID
router.patch( '/:id', authUser, updateProductByIdPatch ); // Actualiza parcialmente el producto por ID
router.delete( '/:id', authUser, removeProductById );     // Elimina todo el producto por ID


module.exports = router;
