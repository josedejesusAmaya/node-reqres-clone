import { Router } from 'express';

import * as productsController from '../../controllers/v1/product-controller';
import { checkAuth, checkIp } from '../../middleware/auth-middleware';
import {
  validateDelete,
  validateNewProductBody,
  validateProductAndNotify,
} from '../../validators/v1/product-validator';
import { handleRequestError } from '../../middleware/validator-middleware';

const router = Router();

router.get('', checkAuth, checkIp, productsController.getProducts); // the order of middlewares matter
router.get('/:id', checkAuth, productsController.getProductById);
router.post(
  '/create',
  checkAuth,
  validateNewProductBody,
  handleRequestError,
  productsController.createProduct
);
router.put('/:id', checkAuth, productsController.updateProduct);
router.patch('/:id', checkAuth, productsController.partialUpdateProduct);
router.post(
  '/:id/notify-client',
  checkAuth,
  validateProductAndNotify,
  handleRequestError,
  productsController.updateProductAndNotify
);
router.delete(
  '/:id',
  checkAuth,
  validateDelete,
  handleRequestError,
  productsController.deleteProductById
);

export default router;
