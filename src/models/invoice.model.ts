import { FlagStatus, InInvoice } from "src/interfaces/app.interface";

export class InvoiceModel implements InInvoice {
    id_doc: string;
    address: string;
    payment_due: number;
    guarantee: number;
    product_detail: string;
    product_number: number;
    product_prize: number;
    product_total_prize: number;
    date: Date;
    type: number;
    forwarder: string;
    forwarder_position: string;
    flag_status: FlagStatus;
    type_income: string;
    
}