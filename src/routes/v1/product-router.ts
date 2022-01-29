import { Router } from "express";

import * as productsController from '../../controllers/v1/product-controller';
import { checkAuth, checkIp } from "../../middleware/auth-middleware";

const router = Router();

router.get('', checkAuth, checkIp, productsController.getProducts); // the order of middlewares matter
router.get('/:id', checkAuth, productsController.getProductById);
router.post('/create', checkAuth, productsController.createProduct);
router.put('/:id', checkAuth, productsController.updateProduct);
router.patch('/:id', checkAuth, productsController.partialUpdateProduct);
router.post('/:id/notify-client', checkAuth, productsController.updateProductAndNotify);
router.delete('/:id', checkAuth, productsController.deleteProductById);

export default router;
