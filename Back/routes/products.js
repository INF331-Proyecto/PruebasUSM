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
    '/',
    deleteProduct
)

router.patch(
    '/',
    updateProduct
)

export default router;