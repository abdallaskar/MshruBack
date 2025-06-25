import jwt from 'jsonwebtoken';
import User from '../models/user.models.js';

// ✅ Middleware 1: التحقق من المستخدم وتوثيقه
export const authenticate = async (req, res, next) => {
    const authHeader = req.headers.authorization;


    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'غير مصرح. لا يوجد رمز توثيق.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // جلب المستخدم من قاعدة البيانات
        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'المستخدم غير موجود' });
        }

        // وضع بيانات المستخدم في الطلب
        req.user = {
            _id: user._id,
            email: user.email,
            role: user.role,
        };

        next();
    } catch (error) {
        res.status(401).json({ message: 'رمز التوثيق غير صالح' });
    }
};

// ✅ Middleware 2: التأكد من أن المستخدم مسؤول (admin)
export const isAdmin = (req, res, next) => {
    if (req.user?.role !== 'admin') {
        return res.status(403).json({ message: 'غير مصرح. هذه العملية تتطلب صلاحية مسؤول.' });
    }
    next();
};
