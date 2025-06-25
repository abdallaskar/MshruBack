import express from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/authController.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { loginSchema, registerSchema } from '../utils/ajvSchemas/auth.schema.mjs'
import validate from '../middlewares/validate.middleware.mjs';

const router = express.Router();

// 🔹 تسجيل مستخدم جديد
// POST /api/auth/register
router.post('/register', validate(registerSchema), registerUser);

// 🔹 تسجيل الدخول
// POST /api/auth/login
router.post('/login', validate(loginSchema), loginUser);

// 🔹 جلب بيانات المستخدم الحالي
// GET /api/auth/me
router.get('/me', authenticate, getUserProfile);

export default router;
