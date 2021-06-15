import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { sign } from 'jsonwebtoken';
import { Authenticated } from "src/interfaces/authen.interface";
import { InUserDocument } from "src/interfaces/user.interface";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class JwtAuthenService implements Authenticated {
    constructor(
        @InjectModel('accounts') private UserCollection: Model<InUserDocument>,
    ) { }

    //กำหนด secretKey ที่ใช้สำหรับการ hash
    static secretKey: string = 'Financial System of Office of Digital Innovation and Intelligent System';

    //สร้าง Token
    async generateAccessToken(user: InUserDocument) {
        const payload = { username: user.username };
        return sign(payload, JwtAuthenService.secretKey, { expiresIn: '2hr' });
    }

    // ยืนยันตัวตน
    async validateUser({username}): Promise<InUserDocument> {
        try {
            return this.UserCollection.findOne({username});
        }
        catch (e) { }
        return null;
    }
}

@Injectable()
export class JwtAuthenStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: JwtAuthenService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: JwtAuthenService.secretKey,
        });
    }

    async validate(payload: {username: string}, done: Function){
        const user = await this.authService.validateUser(payload);
        if(!user) {
            return done(new UnauthorizedException('ยังไมไ่ด้เข้าสู่ระบบ กรุณาเข้าสุู่ระบบ'), false);
        }
        done(null, user);
    }

}