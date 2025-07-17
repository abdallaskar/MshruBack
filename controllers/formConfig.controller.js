import FormConfig from '../models/formConfig.models.js';

// ✅ Get Form Config
export const getFormConfig = async (req, res) => {
    try {
        const config = await FormConfig.findOne();
        if (!config) return res.status(404).json({ message: 'لم يتم العثور على إعدادات النموذج' });
        res.json(config);
    } catch (error) {
        res.status(500).json({ message: 'خطأ في جلب الإعدادات', error: error.message });
    }
};

// ✅ Update Form Config (Update Labels or Required)
export const updateFormConfig = async (req, res) => {
    try {
        const { fields } = req.body;
        if (!fields || !Array.isArray(fields)) {
            return res.status(400).json({ message: 'بيانات الحقول غير صحيحة' });
        }

        let config = await FormConfig.findOne();
        if (!config) {
            config = new FormConfig({ fields });
        } else {
            config.fields = fields;
            config.updatedAt = Date.now();
        }

        await config.save();
        res.json({ message: 'تم تحديث الإعدادات بنجاح', config });
    } catch (error) {
        res.status(500).json({ message: 'خطأ في تحديث الإعدادات', error: error.message });
    }
};

// ✅ Reset Default Config
export const resetDefaultFormConfig = async (req, res) => {
    try {
        const defaultFields = [
            { fieldKey: "projectName", label: "اسم المشروع / البرنامج", placeholder: "أدخل اسم المشروع / البرنامج", isRequired: true },
            { fieldKey: "ownerName", label: "مالك المشروع / البرنامج - إدارة / قسم ", placeholder: "اسم الإدارة المالكة", isRequired: true },
            { fieldKey: "strategicObjective", label: "الهدف الاستراتيجي", placeholder: "أدخل الهدف الاستراتيجي", isRequired: true },
            { fieldKey: "performanceIndicator", label: "مؤشر الأداء المستهدف", placeholder: "أدخل مؤشر الأداء المستهدف", isRequired: true },
            { fieldKey: "previousReading", label: "القراءة السابقة للمؤشر", placeholder: "أدخل القراءة السابقة للمؤشر", isRequired: true },
            { fieldKey: "targetReading", label: "القراءة المستهدفة للمؤشر", placeholder: "أدخل القراءة المستهدفة للمؤشر", isRequired: true },

            // بيانات التواصل
            { fieldKey: "email", label: "البريد الإلكتروني", placeholder: "example@gmail.com", isRequired: true },
            { fieldKey: "phone", label: "الجوال", placeholder: "+966", isRequired: true },
            { fieldKey: "networkPhone", label: "الهاتف الشبكي - اختياري ", placeholder: "الهاتف الشبكي", isRequired: false },

            // الهدف الرئيسي
            { fieldKey: "mainProjectObjective", label: "  الهدف الرئيسي للمشروع او البرنامج ", placeholder: "أدخل الهدف الرئيسي", isRequired: true },

            // فترة التنفيذ
            { fieldKey: "startDate", label: "فترة التنفيذ  |  من - إلي ", placeholder: "mm/dd/yyyy", isRequired: true },

            // وصف المشروع
            { fieldKey: "detailedProjectDescription", label: "  الوصف التفصيلي للمشروع- البرنامج يتضمن الأنشطة والمراحل التنفيذية", placeholder: "يتضمن الأنشطة والمراحل التنفيذية", isRequired: true },

            // الإدارة الداعمة والشركاء
            { fieldKey: "supportingManagement", label: "الإدارة المساندة من داخل إدارة التعليم إن وجدت", placeholder: "الإدارة المساندة", isRequired: true },
            { fieldKey: "supportingAgency", label: "الجهة الداعمة من خارج إدارة التعليم شركات إن وجدت", placeholder: "الجهة الداعمة", isRequired: true },
            { fieldKey: "targetGroup", label: "الفئة المستهدفة", placeholder: "الفئة المستهدفة", isRequired: true },

            // مؤشرات الأداء الإضافية
            { fieldKey: "firstIndicator", label: "المؤشر الأول", placeholder: "اذكر المؤشر الأول", isRequired: true },
            { fieldKey: "secondIndicator", label: "المؤشر الثاني", placeholder: "اذكر المؤشر الثاني", isRequired: true },
            { fieldKey: "thirdIndicator", label: "المؤشر الثالث", placeholder: "اذكر المؤشر الثالث", isRequired: true },

            // التحديات والإجراءات
            { fieldKey: "potentialChallenges", label: "الصعوبات / التحديات المحتملة", placeholder: "اذكر الصعوبات والتحديات المحتملة", isRequired: true },
            { fieldKey: "uniqueProcedures", label: "الإجراءات المقترحة للتعامل معها", placeholder: "اذكر الإجراءات المقترحة", isRequired: true },

            // الميزانية
            { fieldKey: "projectBudget", label: "الموازنة التقديرية للمشروع / البرنامج", placeholder: "أدخل الموازنة التقديرية", isRequired: true },

            // اعتماد صاحب الصلاحية
            { fieldKey: "authorityName", label: " الاسم  ", placeholder: "اسم صاحب الصلاحية", isRequired: true },
            { fieldKey: "authorityDate", label: "التاريخ ", placeholder: "mm/dd/yyyy", isRequired: true },
            { fieldKey: "authoritySignature", label: "التوقيع - اختياري", placeholder: "التوقيع", isRequired: false }

        ];

        let config = await FormConfig.findOne();
        if (!config) {
            config = new FormConfig({ fields: defaultFields });
        } else {
            config.fields = defaultFields;
            config.updatedAt = Date.now();
        }

        await config.save();
        res.json({ message: 'تمت إعادة الإعدادات للوضع الافتراضي', config });
    } catch (error) {
        res.status(500).json({ message: 'فشل إعادة التعيين', error: error.message });
    }
};
