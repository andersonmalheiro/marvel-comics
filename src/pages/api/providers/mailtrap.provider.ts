import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

interface MailUser {
  email: string;
  name: string;
}

export interface MailMessage {
  from: MailUser;
  to: MailUser;
  subject: string;
  body: string;
}

export class MailTrapProvider {
  private transporter!: Mail;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.NEXT_PUBLIC_MAIL_TRAP_HOST,
      port: 2525,
      auth: {
        user: process.env.NEXT_PUBLIC_MAIL_TRAP_USER,
        pass: process.env.NEXT_PUBLIC_MAIL_TRAP_PASS,
      },
    });
  }

  public async sendMail(message: MailMessage): Promise<void> {
    try {
      await this.transporter.sendMail({
        to: {
          address: message.to.email,
          name: message.to.name,
        },
        from: {
          address: message.from.email,
          name: message.from.name,
        },
        subject: message.subject,
        html: message.body,
      });
    } catch (error) {
      return error;
    }
  }
}
