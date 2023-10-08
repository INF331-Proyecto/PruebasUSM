import { Router } from 'express'
import { getProducts, createProduct, deleteProduct } from '../controllers/products.js'

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

export default router;