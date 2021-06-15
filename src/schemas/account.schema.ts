import { BadRequestException } from "@nestjs/common";
import { Schema } from "mongoose";

export const accountSchema = new Schema({
    //หมายเลขของ mongo
    id: String,

    //ส่วนของบัญชีผู้ใช้งาน
    username: String,
    password: String,
    firstname: String,
    lastname: String,
    phone_number: String,
    role: Number,
    created_date: {
        type: Date,
        default: Date.now,
    },
    created_time: {
        type: String,
        default: () => {
            try {
                let date = new Date();
                console.log(date);
                let day_st: string;
                let month_st: string;
                let month = date.getUTCMonth() + 1;
                console.log('month: ' + month);
                let day = date.getDate()
                let year = date.getUTCFullYear();
                if (day < 10)
                    day_st = '0' + day.toString();
                else
                    day_st = day.toString();
                if (month < 10)
                    month_st = '0' + month.toString();
                else
                    month_st = month.toString();
                let new_date = year + '-' + month_st + '-' + day_st;
                console.log(new_date);
                return new_date;
            } catch (err) {
                throw new BadRequestException(err.Message);
            }
        },
    },
    position: String,

})