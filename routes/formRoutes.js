import express from 'express';
import { getUserForms, createOrUpdateForm, getAllForms } from '../controllers/formController.js';
import { authenticate, isAdmin } from '../middlewares/auth.middleware.js';

const router = express.Router();


router.get('/all', authenticate, isAdmin, getAllForms); // يمكنك جعلها فقط للمشرف إذا أردت
// @route   GET /api/form
// @desc    Get form for current user
// @access  Private
router.get('/', authenticate, getUserForms);

// @route   POST /api/form
// @desc    Create or update form
// @access  Private
router.post('/', createOrUpdateForm);

export default router;
