import { Router } from 'express';
import UserController from '../controller/UserController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

//router.get('/', UserController.index);
//router.get('/:id', UserController.show);

router.post('/', UserController.store);
router.put('/', loginRequired, UserController.update);
router.delete('/', loginRequired, UserController.destroy);

export default router;
