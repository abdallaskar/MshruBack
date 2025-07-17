import Form from '../models/form.models.js';
import { sendFormEmail } from '../utils/emailService.js';
// @desc    Get all forms (for admin or general view)
// @route   GET /api/form/all
// @access  Private (or Public if you want)
export const getAllForms = async (req, res) => {
    try {
        const forms = await Form.find().populate('userId', 'userName email');
        res.json(forms);
    } catch (error) {
        res.status(500).json({ message: 'حدث خطأ أثناء جلب النماذج' });
    }
};

// @desc    Get current user's forms
// @route   GET /api/form
// @access  Private
export const getUserForms = async (req, res) => {
    try {
        const forms = await Form.find({ userId: req.user._id });
        if (!forms) {
            return res.status(404).json({ message: 'لا يوجد نموذج محفوظ' });
        }
        // Always return 200, even if empty
        return res.status(200).json(forms);
    } catch (error) {
        res.status(500).json({ message: 'حدث خطأ أثناء جلب النموذج' });
    }
};

// @desc    Create or update form
// @route   POST /api/form
// @access  Private
export const createOrUpdateForm = async (req, res) => {
    try {
        const formId = req.body.formId;
        const existingForm = await Form.findOne({ _id: formId });

        if (existingForm) {
            Object.assign(existingForm, req.body);
            await existingForm.save();
            await sendFormEmail(existingForm); // ممكن تبعت الإيميل بعد التعديل لو عايز
            return res.json({ message: 'تم تعديل النموذج بنجاح', form: existingForm });
        }

        const formData = { ...req.body };
        const newForm = await Form.create(formData);
        await sendFormEmail(newForm);

        res.status(201).json({ message: 'تم إنشاء النموذج بنجاح', form: newForm });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'فشل في حفظ النموذج', error: error.message });
    }
};

