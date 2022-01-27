import { Application } from 'express';

import * as usersController from '../../controllers/v1/user-controller';
import * as productsController from '../../controllers/v1/product-controller';
import errorRoute from '../../utils/midleware';

const createRoutesV1 = (app: Application): void => {
    // users
    app.get('/api/v1/users', usersController.getUsers);
    app.post('/api/v1/users/create', usersController.createUsers);
    app.get('/api/v1/users/:id', usersController.getUserById);
    app.delete('/api/v1/users/:id', usersController.deleteUserById);
    
    // products
    app.get('/api/v1/products', productsController.getProducts);
    app.get('/api/v1/products/:id', productsController.getProductById);
    app.post('/api/v1/products/create', productsController.createProduct);
    app.put('/api/v1/products/:id', productsController.updateProduct);
    app.patch('/api/v1/products/:id', productsController.partialUpdateProduct);
    app.post('/api/v1/products/:id/notify-client', productsController.updateProductAndNotify);
    app.delete('/api/v1/products/:id', productsController.deleteProductById);

    app.use(errorRoute);
}

export default createRoutesV1;
