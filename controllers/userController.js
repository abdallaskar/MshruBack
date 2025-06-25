import User from '../models/user.models.js';

export const getAllUsers = async (req, res) => {
    const users = await User.find().select('-password');
    res.json(users);
};


export const getUserById = async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'المستخدم غير موجود' });
    res.json(user);
};


export const updateUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'المستخدم غير موجود' });

    user.fullName = req.body.fullName || user.fullName;
    user.email = req.body.email || user.email;
    user.role = req.body.role || user.role;
    user.profileImage = req.body.profileImage || user.profileImage;
    user.bio = req.body.bio || user.bio;

    const updatedUser = await user.save();
    res.json({
        message: 'تم تحديث المستخدم بنجاح',
        user: {
            _id: updatedUser._id,
            fullName: updatedUser.fullName,
            email: updatedUser.email,
            role: updatedUser.role,
            profileImage: updatedUser.profileImage,
        },
    });
};


export const deleteUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'المستخدم غير موجود' });

    if (user.role === 'admin') {
        return res.status(400).json({ message: 'لا يمكن حذف الأدمن' });
    }

    await user.deleteOne();
    res.status(200).json({ message: 'تم حذف المستخدم' });
};
