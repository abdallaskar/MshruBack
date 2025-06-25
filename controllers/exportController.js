import ExcelJS from 'exceljs';
import Form from '../models/form.models.js';


const exportFormsToExcel = async (req, res) => {
    try {
        const forms = await Form.find();

        const workbook = new ExcelJS.Workbook();

        // ========== 1. ورقة النماذج الرئيسية ==========
        const mainSheet = workbook.addWorksheet('النماذج', {
            views: [{ rightToLeft: true }],
        });

        mainSheet.columns = [
            { header: 'الرقم التسلسلي', key: 'serial', width: 15 },
            { header: 'اسم المشروع', key: 'projectName', width: 25 },
            { header: 'المالك', key: 'ownerName', width: 20 },
            { header: 'الهدف الاستراتيجي', key: 'strategicObjective', width: 30 },
            { header: 'القراءة السابقة', key: 'previousReading', width: 20 },
            { header: 'القراءة المستهدفة', key: 'targetReading', width: 20 },
            { header: 'البريد الإلكتروني', key: 'email', width: 25 },
            { header: 'رقم الهاتف', key: 'phone', width: 20 },
            { header: 'رقم الهاتف الشبكي', key: 'networkPhone', width: 20 },
            { header: 'الهدف العام للمشروع', key: 'mainProjectObjective', width: 30 },
            { header: 'مدة التنفيذ', key: 'implementationPeriod', width: 20 },
            { header: 'وصف المشروع بالتفصيل', key: 'detailedProjectDescription', width: 40 },
            { header: 'الإدارة الداعمة', key: 'supportingManagement', width: 25 },
            { header: 'الجهة الداعمة', key: 'supportingAgency', width: 25 },
            { header: 'الفئة المستهدفة', key: 'targetGroup', width: 25 },
            { header: 'التحديات المتوقعة', key: 'potentialChallenges', width: 30 },
            { header: 'الإجراءات المميزة', key: 'uniqueProcedures', width: 30 },
            { header: 'ميزانية المشروع', key: 'projectBudget', width: 20 },
            { header: 'اسم الجهة المختصة', key: 'authorityName', width: 25 },
            { header: 'تاريخ الموافقة', key: 'authorityDate', width: 20 },
            { header: 'تاريخ الإنشاء', key: 'createdAt', width: 25 },
        ];

        forms.forEach((form, index) => {
            mainSheet.addRow({
                serial: index + 1,
                projectName: form.projectName,
                ownerName: form.ownerName,
                strategicObjective: form.strategicObjective,
                previousReading: form.previousReading,
                targetReading: form.targetReading,
                email: form.email,
                phone: form.phone,
                networkPhone: form.networkPhone,
                mainProjectObjective: form.mainProjectObjective,
                implementationPeriod: form.implementationPeriod,
                detailedProjectDescription: form.detailedProjectDescription,
                supportingManagement: form.supportingManagement,
                supportingAgency: form.supportingAgency,
                targetGroup: form.targetGroup,
                potentialChallenges: form.potentialChallenges,
                uniqueProcedures: form.uniqueProcedures,
                projectBudget: form.projectBudget,
                authorityName: form.authorityName,
                authorityDate: form.authorityDate,
                createdAt: form.createdAt ? form.createdAt.toLocaleString('ar-EG') : '',
            });
        });

        mainSheet.getRow(1).font = { bold: true };

        // ========== 2. ورقة أعضاء الفريق ==========
        const teamSheet = workbook.addWorksheet('أعضاء الفريق', {
            views: [{ rightToLeft: true }],
        });

        teamSheet.columns = [
            { header: 'اسم المشروع', key: 'projectName', width: 25 },
            { header: 'الاسم', key: 'name', width: 20 },
            { header: 'المنصب', key: 'position', width: 20 },
            { header: 'نوع العمل', key: 'workType', width: 20 },
        ];

        forms.forEach((form) => {
            form.teamMembers.forEach((member) => {
                teamSheet.addRow({
                    projectName: form.projectName,
                    name: member.name,
                    position: member.position,
                    workType: member.workType,
                });
            });
        });

        teamSheet.getRow(1).font = { bold: true };

        // ========== 3. ورقة مؤشرات الأداء ==========
        const indicatorSheet = workbook.addWorksheet('مؤشرات الأداء', {
            views: [{ rightToLeft: true }],
        });

        indicatorSheet.columns = [
            { header: 'اسم المشروع', key: 'projectName', width: 25 },
            { header: 'المؤشر', key: 'indicator', width: 30 },
            { header: 'القيمة', key: 'value', width: 20 },
        ];

        forms.forEach((form) => {
            form.performanceIndicators.forEach((pi) => {
                indicatorSheet.addRow({
                    projectName: form.projectName,
                    indicator: pi.indicator,
                    value: pi.value,
                });
            });
        });

        indicatorSheet.getRow(1).font = { bold: true };

        // ========== إعدادات الرد ==========
        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );
        res.setHeader(
            'Content-Disposition',
            'attachment; filename=all_forms_full.xlsx'
        );

        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        console.error('Export Error:', error);
        res.status(500).json({ message: 'فشل في تصدير البيانات إلى Excel' });
    }
};


export default exportFormsToExcel;