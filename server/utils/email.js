const nodemailer = require('nodemailer');
const { logger } = require('./logger');

// Create transporter
const createTransporter = () => {
  const port = parseInt(process.env.EMAIL_PORT, 10) || 587;
  const secure = port === 465; // true for 465, false for other ports
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port,
    secure,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Email templates
const emailTemplates = {
  emailVerification: (data) => ({
    subject: 'Verify your VIBE BITES account',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #D9A25F; padding: 20px; text-align: center;">
          <h1 style="color: #5A3B1C; margin: 0;">VIBE BITES</h1>
          <p style="color: #5A3B1C; margin: 10px 0 0 0;">Vibe Every Bite</p>
        </div>
        <div style="padding: 30px; background-color: #FFF4E0;">
          <h2 style="color: #5A3B1C;">Welcome to VIBE BITES!</h2>
          <p style="color: #5A3B1C; line-height: 1.6;">
            Hi ${data.name},
          </p>
          <p style="color: #5A3B1C; line-height: 1.6;">
            Thank you for registering with VIBE BITES! To complete your registration, please verify your email address by clicking the button below:
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${data.verificationUrl}" 
               style="background-color: #D9A25F; color: #5A3B1C; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">
              Verify Email Address
            </a>
          </div>
          <p style="color: #5A3B1C; line-height: 1.6;">
            If the button doesn't work, you can copy and paste this link into your browser:
          </p>
          <p style="color: #5A3B1C; word-break: break-all;">
            ${data.verificationUrl}
          </p>
          <p style="color: #5A3B1C; line-height: 1.6;">
            This link will expire in 24 hours.
          </p>
          <p style="color: #5A3B1C; line-height: 1.6;">
            Best regards,<br>
            The VIBE BITES Team
          </p>
        </div>
        <div style="background-color: #5A3B1C; padding: 20px; text-align: center;">
          <p style="color: #FFF4E0; margin: 0; font-size: 12px;">
            © 2024 VIBE BITES. All rights reserved.
          </p>
        </div>
      </div>
    `
  }),

  passwordReset: (data) => ({
    subject: 'Reset your VIBE BITES password',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #D9A25F; padding: 20px; text-align: center;">
          <h1 style="color: #5A3B1C; margin: 0;">VIBE BITES</h1>
          <p style="color: #5A3B1C; margin: 10px 0 0 0;">Vibe Every Bite</p>
        </div>
        <div style="padding: 30px; background-color: #FFF4E0;">
          <h2 style="color: #5A3B1C;">Password Reset Request</h2>
          <p style="color: #5A3B1C; line-height: 1.6;">
            Hi ${data.name},
          </p>
          <p style="color: #5A3B1C; line-height: 1.6;">
            We received a request to reset your password. Click the button below to create a new password:
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${data.resetUrl}" 
               style="background-color: #D9A25F; color: #5A3B1C; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">
              Reset Password
            </a>
          </div>
          <p style="color: #5A3B1C; line-height: 1.6;">
            If you didn't request this password reset, you can safely ignore this email.
          </p>
          <p style="color: #5A3B1C; line-height: 1.6;">
            This link will expire in 1 hour.
          </p>
          <p style="color: #5A3B1C; line-height: 1.6;">
            Best regards,<br>
            The VIBE BITES Team
          </p>
        </div>
        <div style="background-color: #5A3B1C; padding: 20px; text-align: center;">
          <p style="color: #FFF4E0; margin: 0; font-size: 12px;">
            © 2024 VIBE BITES. All rights reserved.
          </p>
        </div>
      </div>
    `
  }),

  orderConfirmation: (data) => ({
    subject: `Order Confirmation - ${data.orderNumber}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #D9A25F; padding: 20px; text-align: center;">
          <h1 style="color: #5A3B1C; margin: 0;">VIBE BITES</h1>
          <p style="color: #5A3B1C; margin: 10px 0 0 0;">Vibe Every Bite</p>
        </div>
        <div style="padding: 30px; background-color: #FFF4E0;">
          <h2 style="color: #5A3B1C;">Order Confirmation</h2>
          <p style="color: #5A3B1C; line-height: 1.6;">
            Hi ${data.name},
          </p>
          <p style="color: #5A3B1C; line-height: 1.6;">
            Thank you for your order! Your order has been confirmed and is being processed.
          </p>
          <div style="background-color: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h3 style="color: #5A3B1C; margin-top: 0;">Order Details</h3>
            <p style="color: #5A3B1C; margin: 5px 0;"><strong>Order Number:</strong> ${data.orderNumber}</p>
            <p style="color: #5A3B1C; margin: 5px 0;"><strong>Order Date:</strong> ${data.orderDate}</p>
            <p style="color: #5A3B1C; margin: 5px 0;"><strong>Total Amount:</strong> ₹${data.total}</p>
          </div>
          <p style="color: #5A3B1C; line-height: 1.6;">
            We'll send you another email when your order ships.
          </p>
          <p style="color: #5A3B1C; line-height: 1.6;">
            Best regards,<br>
            The VIBE BITES Team
          </p>
        </div>
        <div style="background-color: #5A3B1C; padding: 20px; text-align: center;">
          <p style="color: #FFF4E0; margin: 0; font-size: 12px;">
            © 2024 VIBE BITES. All rights reserved.
          </p>
        </div>
      </div>
    `
  }),

  orderShipped: (data) => ({
    subject: `Your order has been shipped - ${data.orderNumber}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #D9A25F; padding: 20px; text-align: center;">
          <h1 style="color: #5A3B1C; margin: 0;">VIBE BITES</h1>
          <p style="color: #5A3B1C; margin: 10px 0 0 0;">Vibe Every Bite</p>
        </div>
        <div style="padding: 30px; background-color: #FFF4E0;">
          <h2 style="color: #5A3B1C;">Your Order Has Been Shipped!</h2>
          <p style="color: #5A3B1C; line-height: 1.6;">
            Hi ${data.name},
          </p>
          <p style="color: #5A3B1C; line-height: 1.6;">
            Great news! Your order has been shipped and is on its way to you.
          </p>
          <div style="background-color: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h3 style="color: #5A3B1C; margin-top: 0;">Shipping Details</h3>
            <p style="color: #5A3B1C; margin: 5px 0;"><strong>Order Number:</strong> ${data.orderNumber}</p>
            <p style="color: #5A3B1C; margin: 5px 0;"><strong>Tracking Number:</strong> ${data.trackingNumber}</p>
            <p style="color: #5A3B1C; margin: 5px 0;"><strong>Carrier:</strong> ${data.carrier}</p>
            <p style="color: #5A3B1C; margin: 5px 0;"><strong>Estimated Delivery:</strong> ${data.estimatedDelivery}</p>
          </div>
          <p style="color: #5A3B1C; line-height: 1.6;">
            You can track your package using the tracking number above.
          </p>
          <p style="color: #5A3B1C; line-height: 1.6;">
            Best regards,<br>
            The VIBE BITES Team
          </p>
        </div>
        <div style="background-color: #5A3B1C; padding: 20px; text-align: center;">
          <p style="color: #FFF4E0; margin: 0; font-size: 12px;">
            © 2024 VIBE BITES. All rights reserved.
          </p>
        </div>
      </div>
    `
  })
};

// Send email function
const sendEmail = async ({ to, subject, template, data }) => {
  try {
    const transporter = createTransporter();
    
    // Get template
    const emailTemplate = emailTemplates[template];
    if (!emailTemplate) {
      throw new Error(`Email template '${template}' not found`);
    }

    const { html } = emailTemplate(data);

    const mailOptions = {
      from: `"VIBE BITES" <${process.env.EMAIL_USER}>`,
      to,
      subject: subject || emailTemplate.subject,
      html
    };

    const info = await transporter.sendMail(mailOptions);
    logger.info('Email sent successfully:', info.messageId);
    return info;
  } catch (error) {
    logger.error('Email sending error:', error);
    throw error;
  }
};

// Send custom email
const sendCustomEmail = async ({ to, subject, html, text }) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"VIBE BITES" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
      text
    };

    const info = await transporter.sendMail(mailOptions);
    logger.info('Custom email sent successfully:', info.messageId);
    return info;
  } catch (error) {
    logger.error('Custom email sending error:', error);
    throw error;
  }
};

module.exports = {
  sendEmail,
  sendCustomEmail
}; 