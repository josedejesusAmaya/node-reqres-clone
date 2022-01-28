import { Router } from 'express';

import * as usersController from '../../controllers/v1/user-controller';

const router = Router();

router.get('', usersController.getUsers);
router.post('/create', usersController.createUsers);
router.get('/:id', usersController.getUserById);
router.delete('/:id', usersController.deleteUserById);
router.post('/login', usersController.login);

export default router;
