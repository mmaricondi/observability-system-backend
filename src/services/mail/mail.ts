import { Injectable } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import { HttpService } from "@nestjs/axios";
import { SendTemplateData } from './sendGrip.interface';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class MailService {
    apiUrl: any;
    sendGripKey: string;
    sendGripFrom: string;
    sendGripTemplate: string;

    constructor(private readonly configService: ConfigService, private http: HttpService) {
        this.apiUrl = this.configService.get<string>("SEND_GRIP_URL") || ""
        this.sendGripKey = this.configService.get<string>("SEND_GRIP_KEY") || ""
        this.sendGripFrom = this.configService.get<string>("SEND_GRIP_FROM") || ""
        this.sendGripTemplate = this.configService.get<string>("SEND_GRIP_TEMPLATE") || "";
        sgMail.setApiKey(this.configService.get<string>("SEND_GRIP_KEY") || "");
    }

    async sendEmail(data: SendTemplateData): Promise<any> {
         const msg = {
            to: data.to,
            from: this.sendGripFrom,
            templateId: this.sendGripTemplate,
            dynamic_template_data: data.dynamicData,
        };

        await sgMail.send(msg);
    }

}
