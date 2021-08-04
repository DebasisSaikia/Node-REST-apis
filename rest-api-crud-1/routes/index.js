import express from 'express';
const router = express.Router();
import { registerController, loginController, userController } from '../controllers'
import auth from '../middlewares/auth';

// endpoints
router.post('/register', registerController.register);

// login
router.post('/login', loginController.login)

// get user info
router.get('/identify', auth, userController.identify)

export default router