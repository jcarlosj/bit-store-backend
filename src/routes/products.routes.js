const { Router } = require( 'express' );
const { getProducts, getProductById, createProduct, removeProductById, updateProductByIdPatch, updateProductByIdPut } = require('../controllers/products.controller');
const { authUser } = require('../middlewares/auth-user.middleware');
const router = Router();

/** Definir todas las rutas de la API para la data de productos */
// http://localhost:3000/api/products/<id-hash> 
router.get( '/', authUser, getProducts );                 // Obtiene todos los productos


router.get( '/:id', getProductById );           // Obtener un producto por ID
router.post( '/', createProduct );              // Crea un nuevo producto
router.put( '/:id', updateProductByIdPut );        // Actualiza todo el producto por ID
router.patch( '/:id', updateProductByIdPatch ); // Actualiza parcialmente el producto por ID
router.delete( '/:id', removeProductById );     // Elimina todo el producto por ID


module.exports = router;
