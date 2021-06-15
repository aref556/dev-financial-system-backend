import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { InAccount, InFinancialDocument, InInvoice, InModalChangePassword, InProfile } from "src/interfaces/app.interface";
import { UserService } from "src/services/user.service";
import { Request } from 'express';
import { AuthGuard } from "@nestjs/passport";
import { ValidationPipe } from "src/pipes/validation.pipe";


@Controller(`api/user`)
@UseGuards(AuthGuard('jwt'))
export class UserController {
    constructor(
        private service: UserService,
    ) { }

    //เก็บข้อมูล
    @Get('data')
    getUserLogin(@Req() req: Request) {
        console.log('Method: Get');
        console.log('path: api/user/data');
        console.log('function: getUserLogin');
        return this.service.getUserLogin(req.user as InAccount);

    }

    @Post('profile')
    updateUserLogin(@Req() req: Request, @Body(new ValidationPipe) body: InProfile) {
        console.log('Method: Post');
        console.log('path: api/user/profile');
        console.log(`function: updateUserLogin`);
        return this.service.updateUserProfile(req.user['_id'], body);
    }

    @Post(`change-password`)
    updatePassword(@Req() req: Request, @Body(new ValidationPipe) body: InModalChangePassword) {
        console.log('Method Post');
        console.log(`path: api/user/change-password`);
        console.log(`function: updatePassword`);
        return this.service.changePassword(req.user['id'], body);


    }



}
