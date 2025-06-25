import express from 'express';
import {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
} from '../controllers/userController.js';
import { authenticate, isAdmin } from '../middlewares/auth.middleware.js';

const userRouter = express.Router();

// ✅ جميع المسارات محمية ومخصصة للمسؤول فقط
userRouter.use(authenticate, isAdmin);

// GET /api/admin/users
userRouter.get('/', getAllUsers);

// GET /api/admin/users/:id
userRouter.get('/:id', getUserById);

// PUT /api/admin/users/:id
userRouter.put('/:id', updateUser);

// DELETE /api/admin/users/:id
userRouter.delete('/:id', deleteUser);

export default userRouter;
