import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
    @Get()
    onStart() {
        return {message: 'Financial System Web API'};
    }

}