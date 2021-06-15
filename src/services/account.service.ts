import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { InAccount } from '../interfaces/app.interface';
import { JwtAuthenService } from "./jwt-authen.service";
import { generate, verify } from 'password-hash'
import { InUserDocument } from "src/interfaces/user.interface";

@Injectable()
export class AccountService {
    constructor(
        private authenService: JwtAuthenService,
        @InjectModel('accounts') private UserCollection: Model<InUserDocument>
    ) { }

    // เข้าสู่ระบบ
    async onLogin(body: InAccount) {
        console.log('onLogin');
        const user = await this.UserCollection.findOne({ username: body.username });
        // console.log(user);
        if (!user) throw new BadRequestException('ไม่มีข้อมูลบัญชีผู้ใช้นี้ในระบบ');
        if (verify(body.password, user.password)) {
            const accessTokenGenerate = await this.authenService.generateAccessToken(user);
            // console.log(accessTokenGenerate);
            return { accessToken: accessTokenGenerate };
        }
        throw new BadRequestException('บัญชีผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
    }

    //ลงทะเบียน
    async onRegister(body: InAccount) {
        console.log('onRegister');
        const count = await this.UserCollection.countDocuments({ username: body.username });
        if (count > 0) throw new BadRequestException('บัญชีนี้มีในระบบแล้ว');

        try {
            let model: InAccount = body;
            model.username = body.username;
            model.password = generate(model.password);
            model.firstname = '';
            model.lastname = '';
            model.role = 1;
            model.id = '';
            model.position = '';

            const modelItem = await this.UserCollection.create(model);
            modelItem.id = modelItem._id;
            const modelItem2 = await this.UserCollection.create(modelItem);
            modelItem2.password = '';
            return modelItem2;

        } catch (err) {
            throw new BadRequestException(`function onRegister : ` + err.Message);
        }

    }

}