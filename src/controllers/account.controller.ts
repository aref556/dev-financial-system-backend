import { Body, Controller, Post } from "@nestjs/common";
import { AccountModel } from "src/models/account.model";
import { ValidationPipe } from "src/pipes/validation.pipe";
import { AccountService } from "src/services/account.service";

@Controller('api/account')
export class AccountController {
    constructor(
        private service: AccountService,
    ) { }

    // เข้่าสู่ระบบ
    @Post('login')
    login(@Body(new ValidationPipe) body: AccountModel) {
        console.log('Method: Post');
        console.log('path: api/account/login');
        console.log('function: login');
        return this.service.onLogin(body);
    }

    //ลงทะเบียน
    @Post('register')
    register(@Body(new ValidationPipe) body: AccountModel) {
        console.log('Method: Post');
        console.log('path: api/account/register');
        console.log('function: register');
        return this.service.onRegister(body);
    }

}