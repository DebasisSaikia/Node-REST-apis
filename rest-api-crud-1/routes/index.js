import express from 'express';
const router = express.Router();
import { registerController } from '../controllers'

// endpoints
router.post('/register', registerController.register);

export default router