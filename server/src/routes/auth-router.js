import { Router } from 'express';
import UserAuth from '../controller/user-auth.js';
import authValidate from '../middleware/auth-validate.js';

/*
Router handling authentication-related endpoints (/signup, /login).
*/
const authRoutes = Router();

// route POST /api/auth/signup
authRoutes.post('/signup', authValidate, UserAuth.signup);

// route POST /api/auth/login
authRoutes.post('/login', authValidate, UserAuth.login);

export default authRoutes;
