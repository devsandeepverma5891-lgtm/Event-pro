import { Router } from 'express';
import { signup, login, logout } from '../controllers/AuthController.js';
import {loginValidation, signupValidation} from '../middleware/AuthValidation.js';  

const router = Router();

router.post('/signup', signupValidation, signup);
router.post('/login', loginValidation, login);
router.post('/logout', logout);

export default router;