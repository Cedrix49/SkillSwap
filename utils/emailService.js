import transporter from './nodemailer.js';

const sendEmail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"IT SkillSwap" <${process.env.SENDER_EMAIL}>`,
      to,
      subject,
      html,
    });

    console.log('Email sent: ', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email sending failed:', error.message);
    return { success: false, error: error.message };
  }
};

export default sendEmail;
