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
        if (!arr || !arr.length) return '<p style="color: #666;">لا يوجد بيانات</p>';
        const headerRow = headers.map(h => `<th style="background-color: #0DA9A6; color: white; padding: 8px; border: 1px solid #ccc;">${h}</th>`).join('');
        const rows = arr.map(item => {
            return `<tr>${keys.map(key => `<td style="padding: 8px; border: 1px solid #ccc;">${item[key] || ''}</td>`).join('')}</tr>`;
        }).join('');
        return `
      <table style="border-collapse: collapse; width: 100%; margin-top: 10px; font-family: Arial, sans-serif; font-size: 14px; direction: rtl;">
        <thead><tr>${headerRow}</tr></thead>
        <tbody>${rows}</tbody>
      </table>`;
    };

    const html = `
    <div style="font-family: Arial, sans-serif; max-width: 800px; margin: auto; border: 1px solid #ccc; border-radius: 8px; overflow: hidden; direction: rtl; text-align: right;">

      <div style="background-color: #0DA9A6; color: white; padding: 16px; text-align: center;">
        <h2>📄 تم استلام نموذج جديد</h2>
      </div>

      <div style="padding: 20px; background-color: #f9f9f9;">

        <h3 style="color: #15445A;">📝 بيانات النموذج</h3>
        <table style="border-collapse: collapse; width: 100%; font-size: 14px;">
          <tbody>
            <tr><td style="padding: 8px; font-weight: bold;">اسم المشروع:</td><td style="padding: 8px;">${formData.projectName}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">الإدارة المالكة:</td><td style="padding: 8px;">${formData.ownerName}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">الهدف الاستراتيجي:</td><td style="padding: 8px;">${formData.strategicObjective}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">مؤشر الأداء:</td><td style="padding: 8px;">${formData.performanceIndicator}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">القراءة السابقة:</td><td style="padding: 8px;">${formData.previousReading}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">القراءة المستهدفة:</td><td style="padding: 8px;">${formData.targetReading}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">البريد الإلكتروني:</td><td style="padding: 8px;">${formData.email}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">رقم الهاتف:</td><td style="padding: 8px;">${formData.phone}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">هاتف الشبكة:</td><td style="padding: 8px;">${formData.networkPhone}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">الهدف الرئيسي:</td><td style="padding: 8px;">${formData.mainProjectObjective}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">الفترة الزمنية:</td><td style="padding: 8px;">من ${formData.startDate} إلى ${formData.endDate}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">الوصف التفصيلي للمشروع:</td><td style="padding: 8px;">${formData.detailedProjectDescription}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">الإدارة الداعمة:</td><td style="padding: 8px;">${formData.supportingManagement}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">الجهة الداعمة:</td><td style="padding: 8px;">${formData.supportingAgency}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">الفئة المستهدفة:</td><td style="padding: 8px;">${formData.targetGroup}</td></tr>

            <tr><td style="padding: 8px; font-weight: bold;">المؤشر الأول:</td><td style="padding: 8px;">${formData.firstIndicator}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">المؤشر الثاني:</td><td style="padding: 8px;">${formData.secondIndicator}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">المؤشر الثالث:</td><td style="padding: 8px;">${formData.thirdIndicator}</td></tr>

            <tr><td style="padding: 8px; font-weight: bold;">التحديات المتوقعة:</td><td style="padding: 8px;">${formData.potentialChallenges}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">الإجراءات الفريدة:</td><td style="padding: 8px;">${formData.uniqueProcedures}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">الميزانية:</td><td style="padding: 8px;">${formData.projectBudget}</td></tr>

            <tr><td style="padding: 8px; font-weight: bold;">اسم المفوض:</td><td style="padding: 8px;">${formData.authorityName}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">تاريخ التفويض:</td><td style="padding: 8px;">${formData.authorityDate}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">التوقيع:</td><td style="padding: 8px;">${formData.authoritySignature}</td></tr>
          </tbody>
        </table>

        <h3 style="color: #15445A; margin-top: 20px;">👥 أعضاء الفريق:</h3>
        ${formatArrayToTable(
        formData.teamMembers,
        ['الاسم', 'المسمى الوظيفي', 'نوع العمل'],
        ['name', 'position', 'workType']
    )}

        <p style="font-size: 12px; color: #888; margin-top: 20px;">تم الإرسال في: ${new Date().toLocaleString('ar-EG')}</p>
      </div>
    </div>
  `;

    const mailOptions = {
        from: `"نموذج إلكتروني" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_RECEIVER || process.env.EMAIL_USER,
        subject: '📩 نموذج جديد تم إدخاله',
        html,
    };

    await transporter.sendMail(mailOptions);
};
