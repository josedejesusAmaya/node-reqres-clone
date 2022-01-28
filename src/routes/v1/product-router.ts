import { Router } from "express";

import * as productsController from '../../controllers/v1/product-controller';

const router = Router();

router.get('', productsController.getProducts);
router.get('/:id', productsController.getProductById);
router.post('/create', productsController.createProduct);
router.put('/:id', productsController.updateProduct);
router.patch('/:id', productsController.partialUpdateProduct);
router.post('/:id/notify-client', productsController.updateProductAndNotify);
router.delete('/:id', productsController.deleteProductById);

export default router;
