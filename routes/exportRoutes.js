import express from 'express';
import exportFormsToExcel from '../controllers/exportController.js';
import { authenticate, isAdmin } from '../middlewares/auth.middleware.js';

const exportRouter = express.Router();


exportRouter.get('/forms', authenticate, isAdmin, exportFormsToExcel);



export default exportRouter;
