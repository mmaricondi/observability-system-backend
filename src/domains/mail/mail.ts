import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
    templateEmail(to: string, subject: string, body: string): string {
        return `Email template for ${to} with subject "${subject}" and body: ${body}`;
    }
    sendEmail(to: string, subject: string, body: string): string {
        return this.templateEmail(to, subject, body) + ' - Email sent successfully!';
    }
    
    validateEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    generateCode(): string {
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        return code;
    }
}
