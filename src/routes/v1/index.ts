import { Application } from 'express';

import userRouter from './user-router';
import userProduct from './product-router';
import errorRoute from '../../utils/midleware';

const createRoutesV1 = (app: Application): void => {
    app.use('/api/v1/users', userRouter);
    app.use('/api/v1/products', userProduct);
    app.use(errorRoute);
};

export default createRoutesV1;
