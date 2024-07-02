import nodemailer from 'nodemailer';

export const sendEmail = async (email: string, subject: string, message: string) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: true, // use SSL
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const mailOptions: nodemailer.SendMailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: `${subject}`,
            text: message,
            html: `<b>${message}</b>`
        };

        const mailRes = await transporter.sendMail(mailOptions);
        console.log('mailRes', mailRes);

        let mailResponse: string = '';
        if (mailRes.accepted.length > 0) {
            mailResponse = 'Email sent successfully';
        } else if (mailRes.rejected.length > 0) {
            mailResponse = 'Email not sent';
        } else {
            mailResponse = 'Email server error sent';
        }
        return mailResponse;
    } catch (error: any) {
        return JSON.stringify(error.message, null, 500);
    }
};

export interface EmailOptions {
    from: string;
    to: string;
    email: string;
    subject: string;
    text: string;
    html: string;
}

export interface MailResponse {
    accepted: string[];
    rejected: string[];
}

export const sendRegistrationEmailTemplate = async (userEmail: string, eventName: string, userName: string): Promise<string> => {
    try {
        const subject: string = `Confirmation: You have registered for ${eventName}`;
        const message: string = `Hello ${userName},\n\nWe hope you enjoy our services. Thank you for choosing us.`;

        const mailRes: string = await sendEmail(userEmail, subject, message);
        return mailRes;
    } catch (error: any) {
        return JSON.stringify(error.message, null, 500);
    }
};
