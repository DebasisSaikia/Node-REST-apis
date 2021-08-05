import express from 'express';
const router = express.Router();
import { registerController, loginController, userController, refreshController, productController } from '../controllers'
import admin from '../middlewares/admin';
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
router.post('/products', [auth, admin], productController.store);

// update products
router.put('/products/:id', [auth, admin], productController.update);

// delete products
router.delete('/products/:id', [auth, admin], productController.destroy);

// get all products
router.get('/products', productController.getAll);

export default router