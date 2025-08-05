import { Injectable } from '@nestjs/common';
import { MailService } from '@domains/mail/mail';
import { UserService } from '@domains/user/user';
import { CustomRepositoryCannotInheritRepositoryError } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        private readonly mailService: MailService,
        private readonly userService: UserService
    ) {}

    async login({ email }: { email: string }): Promise<any> {
        const code = this.genereteCode();
        const emailResponse = this.mailService.sendEmail(email, 'Login Successful', 'You have successfully logged in. Your code is: ' + code);
        const user = {
            email,
            username: this.generateUsername(email),
            code
        };
       await this.userService.upsertUser(user);

       return user;
    }

    async validateCode({ email, code }: { email: string; code: string }): Promise<{jwt: string}> {
        const user = await this.userService.findByEmail(email);
        let jwt = '';
        if (user) {
            if (!this.validateUserCode(user, code)) {
                console.log('Invalid code');
            }else {
                console.log('Code validated successfully');
                jwt = '9989343fd.34343.fdf33434343';
            }
        }else {
            console.log('User not found');
        }
        return { jwt };
    }

    generateUsername(email: string): string {
        const username = email.split('@')[0];
        return username;
    }

    genereteCode(): string {
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        return code;
    }

    validateUserCode(user: any, code: string): boolean {
        return user.code === code;
    }
}
