import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { verify, generate } from "password-hash";
import { Model } from "mongoose";
import { InAccount, InModalChangePassword, InProfile } from "src/interfaces/app.interface";
import { InUserDocument } from "src/interfaces/user.interface";


@Injectable()
export class UserService {
    constructor(
        @InjectModel('accounts') private UserCollection: Model<InUserDocument>,
    ) { }

    //เก็บข้อมูลของผู้ใช้
    async getUserLogin(user: any) {
        console.log('getUserLogin');
        try {
            const userLogin: InUserDocument = user;
            userLogin.password = '';
            return userLogin;

        } catch (err) {
            throw new BadRequestException(err.Message);
        }


    }

    //อัพเดทโปรไฟล์
    async updateUserProfile(userID: string, body: InProfile) {
        console.log('updateUserProfile');
        const updated = await this.UserCollection.updateMany({ _id: userID }, {
            firstname: body.firstname,
            lastname: body.lastname,
            username: body.username,
            position: body.position,
        });
        console.log('updated : ' + updated.nModified);
        if (!updated.nModified)
            throw new BadRequestException('ข้อมูลโปรไฟล์ไม่มีการเปลี่ยนแปลง');
        const userItem = await this.UserCollection.findById(userID, {
            password: false,
            _id: false,
        });

        return userItem;



    }

    async changePassword(userID: string, body: InModalChangePassword) {
        console.log(`changPassword`);
        const memberItem = await this.UserCollection.findById(userID);
        if (!verify(body.origin_pass, memberItem.password))
            throw new BadRequestException(`รหัสผ่านเดิมไม่ถูกต้อง`);
        if (body.new_pass != body.cnew_pass)
            throw new BadRequestException(`รหัสผ่านใหม่กับยืนยันรหัสใหม่ไม่ตรงกัน`);
        try {
            await this.UserCollection.updateOne({ _id: userID }, {
                password: generate(body.new_pass),
            });
        } catch (err) {
            throw new BadRequestException(`function changePassword : ` + err.Message);
        }

        return { 'flag': true };

    }




}