import { Router } from 'express';
import LoginController from '../controller/LoginController';

const router = new Router();

router.post('/', LoginController.store);

export default router;
