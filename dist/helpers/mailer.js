"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendRegistrationEmailTemplate = exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendEmail = async (email, subject, message) => {
    try {
        const transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            secure: true, // use SSL
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: `${subject}`,
            text: message,
            html: `<b>${message}</b>`
        };
        const mailRes = await transporter.sendMail(mailOptions);
        console.log('mailRes', mailRes);
        let mailResponse = '';
        if (mailRes.accepted.length > 0) {
            mailResponse = 'Email sent successfully';
        }
        else if (mailRes.rejected.length > 0) {
            mailResponse = 'Email not sent';
        }
        else {
            mailResponse = 'Email server error sent';
        }
        return mailResponse;
    }
    catch (error) {
        return JSON.stringify(error.message, null, 500);
    }
};
exports.sendEmail = sendEmail;
const sendRegistrationEmailTemplate = async (userEmail, eventName, userName) => {
    try {
        const subject = `Confirmation: You have registered for ${eventName}`;
        const message = `Hello ${userName},\n\nWe hope you enjoy our services. Thank you for choosing us.`;
        const mailRes = await (0, exports.sendEmail)(userEmail, subject, message);
        return mailRes;
    }
    catch (error) {
        return JSON.stringify(error.message, null, 500);
    }
};
exports.sendRegistrationEmailTemplate = sendRegistrationEmailTemplate;
