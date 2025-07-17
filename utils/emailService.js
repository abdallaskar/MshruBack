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
      return `<tr>${keys.map(key => `<td style="padding: 8px; border: 1px solid #ccc;">${item[key]?.value || ''}</td>`).join('')}</tr>`;
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
            <tr><td style="padding: 8px; font-weight: bold;">${formData.projectName?.label}:</td><td style="padding: 8px;">${formData.projectName?.value}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">${formData.ownerName?.label}:</td><td style="padding: 8px;">${formData.ownerName?.value}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">${formData.strategicObjective?.label}:</td><td style="padding: 8px;">${formData.strategicObjective?.value}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">${formData.performanceIndicator?.label}:</td><td style="padding: 8px;">${formData.performanceIndicator?.value}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">${formData.previousReading?.label}:</td><td style="padding: 8px;">${formData.previousReading?.value}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">${formData.targetReading?.label}:</td><td style="padding: 8px;">${formData.targetReading?.value}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">${formData.email?.label}:</td><td style="padding: 8px;">${formData.email?.value}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">${formData.phone?.label}:</td><td style="padding: 8px;">${formData.phone?.value}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">${formData.networkPhone?.label}:</td><td style="padding: 8px;">${formData.networkPhone?.value}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">${formData.mainProjectObjective?.label}:</td><td style="padding: 8px;">${formData.mainProjectObjective?.value}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">${formData.startDate?.label}:</td><td style="padding: 8px;">${formData.startDate?.value}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">${formData.endDate?.label}:</td><td style="padding: 8px;">${formData.endDate?.value}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">${formData.detailedProjectDescription?.label}:</td><td style="padding: 8px;">${formData.detailedProjectDescription?.value}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">${formData.supportingManagement?.label}:</td><td style="padding: 8px;">${formData.supportingManagement?.value}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">${formData.supportingAgency?.label}:</td><td style="padding: 8px;">${formData.supportingAgency?.value}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">${formData.targetGroup?.label}:</td><td style="padding: 8px;">${formData.targetGroup?.value}</td></tr>

            <tr><td style="padding: 8px; font-weight: bold;">${formData.firstIndicator?.label}:</td><td style="padding: 8px;">${formData.firstIndicator?.value}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">${formData.secondIndicator?.label}:</td><td style="padding: 8px;">${formData.secondIndicator?.value}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">${formData.thirdIndicator?.label}:</td><td style="padding: 8px;">${formData.thirdIndicator?.value}</td></tr>

            <tr><td style="padding: 8px; font-weight: bold;">${formData.potentialChallenges?.label}:</td><td style="padding: 8px;">${formData.potentialChallenges?.value}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">${formData.uniqueProcedures?.label}:</td><td style="padding: 8px;">${formData.uniqueProcedures?.value}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">${formData.projectBudget?.label}:</td><td style="padding: 8px;">${formData.projectBudget?.value}</td></tr>

            <tr><td style="padding: 8px; font-weight: bold;">${formData.authorityName?.label}:</td><td style="padding: 8px;">${formData.authorityName?.value}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">${formData.authorityDate?.label}:</td><td style="padding: 8px;">${formData.authorityDate?.value}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">${formData.authoritySignature?.label}:</td><td style="padding: 8px;">${formData.authoritySignature?.value}</td></tr>
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
