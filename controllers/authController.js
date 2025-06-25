import User from '../models/user.models.js'
import generateToken from '../utils/generateToken.js'
// @desc    Login user
// @route   POST /api/auth/login
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: ' البريد الإلكتروني غير موجود ' });
        }
        if (!await user.comparePassword(password)) {
            return res.status(401).json({ message: '   كلمة المرور غير صحيحة' });
        }

        res.status(200).json({
            user: {
                _id: user._id,
                userName: user.userName,
                email: user.email,
                role: user.role,
                profileImage: user.profileImage
            },
            token: generateToken(user),

        });
    } catch (error) {
        res.status(500).json({ message: 'حدث خطأ أثناء تسجيل الدخول' });
    }
};


export const registerUser = async (req, res) => {
    const { userName, email, password, role, } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'البريد الإلكتروني موجود بالفعل' });
        }

        const newUser = await User.create({
            userName,
            email,
            password,
            role: role || 'user'
        });

        res.status(201).json({
            user: {
                _id: newUser._id,
                userName: newUser.userName,
                email: newUser.email,
                role: newUser.role,
                profileImage: newUser.profileImage
            },
            token: generateToken(newUser),
        });
    } catch (error) {

        res.status(500).json({ message: 'فشل في إنشاء الحساب' });
    }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
export const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
};
