const { Router } = require( 'express' );
const { getProducts, getProductById, createProduct, removeProductById, updateProductByIdPatch, updateProductByIdPut, getPaginatedProducts } = require('../controllers/products.controller');
const { authUser } = require('../middlewares/auth-user.middleware');
const router = Router();

/** Definir todas las rutas de la API para la data de productos */
// http://localhost:3000/api/products/<id-hash> 
// router.get( '/', getProducts );                          // Obtiene todos los productos
router.get( '/ref/:id', getProductById );                   // Obtener un producto por ID


router.get( '/user/:category?/:page?/:pageSize?', authUser, getPaginatedProducts );
    // http://localhost:3000/api/products/user/all
    // http://localhost:3000/api/products/user/all/1/9
    // http://localhost:3000/api/products/user/electronica
    // http://localhost:3000/api/products/user/electronica/1/9
router.get( '/:category?/:page?/:pageSize?', getPaginatedProducts );   // Obtener todos los productos paginados
    // http://localhost:3000/api/products/all               pagina: 1, total: 10
    // http://localhost:3000/api/products/all/1/9           pagina: 1, total:  9
    // http://localhost:3000/api/products/electronica       pagina: 1, total: 10
    // http://localhost:3000/api/products/electronica/1/9   pagina: 1, total:  9, categoria: electronica

router.post( '/', authUser, createProduct );              // Crea un nuevo producto
router.put( '/:id', authUser, updateProductByIdPut );     // Actualiza todo el producto por ID
router.patch( '/:id', authUser, updateProductByIdPatch ); // Actualiza parcialmente el producto por ID
router.delete( '/:id', authUser, removeProductById );     // Elimina todo el producto por ID


module.exports = router;
