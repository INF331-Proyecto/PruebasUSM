import { Router } from 'express'
import { getProducts, createProduct, deleteProduct, updateProduct } from '../controllers/products.js'

const router = Router();

router.get(
    '/',
    getProducts
);

router.post(
    '/',
    createProduct
)

router.delete(
    '/:id',
    deleteProduct
);

router.patch(
    '/:id',
    updateProduct
)

export default router;