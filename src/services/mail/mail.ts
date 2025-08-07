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
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let codigo = '';
        for (let i = 0; i < 6; i++) {
            const randomIndex = Math.floor(Math.random() * caracteres.length);
            codigo += caracteres[randomIndex];
        }
        return codigo;
    }
}
