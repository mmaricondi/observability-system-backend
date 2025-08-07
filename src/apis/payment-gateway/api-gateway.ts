import { Injectable } from "@nestjs/common";

@Injectable()
export class ApiGatewayService {
    fetchWebhooks() {
        return "webhook list"
    }
}