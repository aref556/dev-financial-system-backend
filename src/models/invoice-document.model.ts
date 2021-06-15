import { FlagStatus, InInvoiceDocument } from "src/interfaces/app.interface";

export class InvoiceDocumentModel implements InInvoiceDocument {
    type: string;
    address: string;
    address_option: string;
    date: string;
    title: string;
    title_to: string;
    message_start: string;
    id_tax: string;
    message_end: string;
    manager_name: string;
    manager_position: string;
    flag_status: FlagStatus;
    type_income: string;
    
}