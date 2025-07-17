import express from 'express';

import { authenticate, isAdmin } from '../middlewares/auth.middleware.js';
import { exportWord } from '../controllers/exportWordController.js';

const exportWordRouter = express.Router();


exportWordRouter.get('/word', authenticate, isAdmin, exportWord);



export default exportWordRouter;
