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
            { header: 'الرقم التسلسلي', key: 'serial', width: 10 },
            { header: 'اسم المشروع', key: 'projectName', width: 25 },
            { header: 'المالك', key: 'ownerName', width: 20 },
            { header: 'الهدف الاستراتيجي', key: 'strategicObjective', width: 30 },
            { header: 'مؤشر الأداء', key: 'performanceIndicator', width: 30 },
            { header: 'المؤشر الأول', key: 'firstIndicator', width: 20 },
            { header: 'المؤشر الثاني', key: 'secondIndicator', width: 20 },
            { header: 'المؤشر الثالث', key: 'thirdIndicator', width: 20 },
            { header: 'القراءة السابقة', key: 'previousReading', width: 20 },
            { header: 'القراءة المستهدفة', key: 'targetReading', width: 20 },
            { header: 'البريد الإلكتروني', key: 'email', width: 25 },
            { header: 'رقم الهاتف', key: 'phone', width: 20 },
            { header: 'هاتف الشبكة', key: 'networkPhone', width: 20 },
            { header: 'الهدف الرئيسي', key: 'mainProjectObjective', width: 30 },
            { header: 'بداية التنفيذ', key: 'startDate', width: 15 },
            { header: 'نهاية التنفيذ', key: 'endDate', width: 15 },
            { header: 'الوصف التفصيلي', key: 'detailedProjectDescription', width: 40 },
            { header: 'الإدارة الداعمة', key: 'supportingManagement', width: 25 },
            { header: 'الجهة الداعمة', key: 'supportingAgency', width: 25 },
            { header: 'الفئة المستهدفة', key: 'targetGroup', width: 25 },
            { header: 'التحديات المتوقعة', key: 'potentialChallenges', width: 30 },
            { header: 'الإجراءات الفريدة', key: 'uniqueProcedures', width: 30 },
            { header: 'الميزانية', key: 'projectBudget', width: 20 },
            { header: 'اسم المفوض', key: 'authorityName', width: 20 },
            { header: 'تاريخ التفويض', key: 'authorityDate', width: 20 },
            { header: 'التوقيع', key: 'authoritySignature', width: 20 },
            { header: 'تاريخ الإنشاء', key: 'createdAt', width: 25 },
        ];

        forms.forEach((form, index) => {
            mainSheet.addRow({
                serial: index + 1,
                projectName: form.projectName?.value,
                ownerName: form.ownerName?.value,
                strategicObjective: form.strategicObjective?.value,
                performanceIndicator: form.performanceIndicator?.value,
                firstIndicator: form.firstIndicator?.value,
                secondIndicator: form.secondIndicator?.value,
                thirdIndicator: form.thirdIndicator?.value,
                previousReading: form.previousReading?.value,
                targetReading: form.targetReading?.value,
                email: form.email?.value,
                phone: form.phone?.value,
                networkPhone: form.networkPhone?.value,
                mainProjectObjective: form.mainProjectObjective?.value,
                startDate: form.startDate?.value,
                endDate: form.endDate?.value,
                detailedProjectDescription: form.detailedProjectDescription?.value,
                supportingManagement: form.supportingManagement?.value,
                supportingAgency: form.supportingAgency?.value,
                targetGroup: form.targetGroup?.value,
                potentialChallenges: form.potentialChallenges?.value,
                uniqueProcedures: form.uniqueProcedures?.value,
                projectBudget: form.projectBudget?.value,
                authorityName: form.authorityName?.value,
                authorityDate: form.authorityDate?.value,
                authoritySignature: form.authoritySignature?.value || 'لا يوجد توقيع',
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
                    projectName: form.projectName?.value,
                    name: member.name?.value,
                    position: member.position?.value,
                    workType: member.workType?.value,
                });
            });
        });

        teamSheet.getRow(1).font = { bold: true };

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
