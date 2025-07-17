import express from 'express';
import { getFormConfig, updateFormConfig, resetDefaultFormConfig } from '../controllers/formConfig.controller.js';

const formConfigRouter = express.Router();

formConfigRouter.get('/', getFormConfig); // ✅ GET الإعدادات الحالية
formConfigRouter.put('/', updateFormConfig); // ✅ تعديل الإعدادات
formConfigRouter.post('/reset', resetDefaultFormConfig); // ✅ إعادة تعيين الإعدادات الافتراضية

export default formConfigRouter;
