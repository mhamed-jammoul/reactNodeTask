// src/routes/userRoutes.ts
import { Router } from 'express';
import { loginUser , createUser ,getUsers } from  '../controllers/userController';

const router =  Router();
// Route to login and get the token but now i dont use it i get it staticly from postman
router.post('/login', loginUser);
// Route to create a new driver user
router.post('/user', createUser);
// Route to get the list of all users drivers 
router.get('/users', getUsers);

export default router;
