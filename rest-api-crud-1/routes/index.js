import express from 'express';
const router = express.Router();
import { registerController, loginController, userController, refreshController, productController } from '../controllers'
import auth from '../middlewares/auth';

// endpoints
router.post('/register', registerController.register);

// login
router.post('/login', loginController.login)

// get user info
router.get('/identify', auth, userController.identify);

// generate refresh token
router.post('/refresh', refreshController.refresh);


// logout
router.post('/logout', auth, loginController.logout);

// create products
router.post('/products', productController.store);

export default router