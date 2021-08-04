import express from 'express';
const router = express.Router();
import { registerController, loginController } from '../controllers'

// endpoints
router.post('/register', registerController.register);

// login
router.post('/login', loginController.login)

export default router