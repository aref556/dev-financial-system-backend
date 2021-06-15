import { BadRequestException } from "@nestjs/common";
import { Schema } from "mongoose";

export const documentSchema = new Schema({
    id: String,
    type: Number,
    address: String,
    payment_due: String,
    guarantee: Number,
    product_detail_1: String,
    product_number_1: Number,
    product_prize_1: Number,
    product_detail_2: String,
    product_number_2: Number,
    product_prize_2: Number,
    product_total_prize: Number,
    date: String,
    forwarder: String,
    forwarder_position: String,

    id_doc: String,
    title: String,
    title_to: String,
    message: String,
    guarantor: String,
    guarantor_position: String,

    prize_stand: Number,

    created_by: String,
    created_date: {
        type: Date,
        default: Date.now,
    },
    created_time: {
        type: String,
        default: () => {
            try {
                let date = new Date();
                // console.log(date);
                let day_st: string;
                let month_st: string;
                let month = date.getUTCMonth() + 1;
                // console.log('month: ' + month);
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
    flag_status: Number,
    type_income: String,
    success_date: Date,
    success_time: String,
    note: String,
    success_by: String,
    date_date: Date,




})