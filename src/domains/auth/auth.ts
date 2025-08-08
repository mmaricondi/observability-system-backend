import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '@services/mail/mail';
import { UserService } from '@repositories/user/user';

@Injectable()
export class AuthService {
    constructor(
        private readonly mailService: MailService,
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async login({ email }: { email: string }): Promise<any> {
        const code = this.mailService.generateCode()
        const emailResponse = this.mailService.sendEmail(email, 'Login Successful', 'You have successfully logged in. Your code is: ' + code);
        const user = {
            email,
            username: this.generateUsername(email),
            code
        };
       await this.userService.upsertUser(user);

       return user;
    }

    async validateCode({ email, code }: { email: string; code: string }): Promise<any> {
        const user = await this.userService.findByEmail(email);
        let access_token = '';
        if (user) {
            if (!this.validateUserCode(user, code)) {
            }else {
                access_token = await this.jwtService.signAsync({email, username: user?.username, id: user?.id});
            }
        }
        return { access_token };
    }

    async validateToken({token}: {token: string}): Promise<any> {
        try {
           const isValidToken = await this.jwtService.verifyAsync(token);
           return { isValidToken, message: 'Token is valid' };
        } catch (error) {
            return { isValidToken: null, message: 'Token is invalid or expired' };
        }
    }
    generateUsername(email: string): string {
        const username = email.split('@')[0];
        return username;
    }

    validateUserCode(user: any, code: string): boolean {
        return user.code === code;
    }
}
