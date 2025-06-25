import nodemailer from 'nodemailer';

export const sendFormEmail = async (formData) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const formatArrayToTable = (arr, headers, keys) => {
        if (!arr || !arr.length) return '<p>لا يوجد بيانات</p>';
        const headerRow = headers.map(h => `<th>${h}</th>`).join('');
        const rows = arr.map(item => {
            return `<tr>${keys.map(key => `<td>${item[key] || ''}</td>`).join('')}</tr>`;
        }).join('');
        return `<table border="1" style="border-collapse: collapse; width: 100%; margin: 10px 0;"> 
              <thead><tr>${headerRow}</tr></thead><tbody>${rows}</tbody>
            </table>`;
    };

    const html = `
    <h2 style="color:#0DA9A6;">📄 تم استلام نموذج جديد</h2>

    <p><strong>اسم المشروع:</strong> ${formData.projectName}</p>
    <p><strong>الهدف الرئيسي:</strong> ${formData.strategicObjective}</p>
    <p><strong>الهدف التفصيلي:</strong> ${formData.mainProjectObjective}</p>
    <p><strong>الفئة المستهدفة:</strong> ${formData.targetGroup}</p>
    <p><strong>الإدارة المالكة:</strong> ${formData.ownerName}</p>
    <p><strong>الجهة الداعمة:</strong> ${formData.supportingAgency}</p>
    <p><strong>الإدارة الداعمة:</strong> ${formData.supportingManagement}</p>
    <p><strong>البريد الإلكتروني:</strong> ${formData.email}</p>
    <p><strong>رقم الهاتف:</strong> ${formData.phone}</p>
    <p><strong>هاتف الشبكة:</strong> ${formData.networkPhone}</p>
    <p><strong>وصف المشروع:</strong> ${formData.detailedProjectDescription}</p>
    <p><strong>الفترة الزمنية:</strong> ${formData.implementationPeriod}</p>
    <p><strong>القراءة السابقة:</strong> ${formData.previousReading}</p>
    <p><strong>القراءة المستهدفة:</strong> ${formData.targetReading}</p>
    <p><strong>التحديات المتوقعة:</strong> ${formData.potentialChallenges}</p>
    <p><strong>الإجراءات الفريدة:</strong> ${formData.uniqueProcedures}</p>
    <p><strong>الميزانية:</strong> ${formData.projectBudget}</p>
    <p><strong>اسم المفوض:</strong> ${formData.authorityName}</p>
    <p><strong>تاريخ التفويض:</strong> ${formData.authorityDate}</p>

    <h3>👥 أعضاء الفريق:</h3>
    ${formatArrayToTable(
        formData.teamMembers,
        ['الاسم', 'المسمى الوظيفي', 'نوع العمل'],
        ['name', 'position', 'workType']
    )}

    <h3>📊 مؤشرات الأداء:</h3>
    ${formatArrayToTable(
        formData.performanceIndicators,
        ['المؤشر', 'القيمة'],
        ['indicator', 'value']
    )}

    <p style="font-size: 12px; color: #888;">تم الإرسال في: ${new Date().toLocaleString('ar-EG')}</p>
  `;

    const mailOptions = {
        from: `"نموذج إلكتروني" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_RECEIVER || process.env.EMAIL_USER,
        subject: '📩 نموذج جديد تم إدخاله',
        html,
    };

    await transporter.sendMail(mailOptions);
};
