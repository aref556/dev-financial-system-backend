import { FlagStatus, InDelivery } from "src/interfaces/app.interface";

export class DeliveryModel implements InDelivery {
    id_doc: string;
    date: string;
    address: string;
    payment_due: number;
    prize_stand: number;
    guarantee: number;
    product_detail: string;
    product_number: number;
    product_prize: number;
    type: number;
    forwarder: string;
    forwarder_position: string;
    flag_status: FlagStatus;
    type_income: string;
    
}