import { InDocuments } from "./document.interface";

// ข้อมูลผู้ใช้งาน
export interface InAccount {
    username: string;
    password: string;
    // ข้อมูลส่วนตัวควรเก็บด้วยไหม
    firstname: string;
    lastname: string;
    role: RoleAccount;
    id?: any;
    position: string;
}

// ข้อมูลเอกสารทั้งใบแจ้งหนี้และใบเสร็จ อาจจะไม่เอา
export interface InFinancialDocument {
    id_doc: string;
    flag_status: FlagStatus;
    role: RoleDocument;
    date_created: Date;
    date_receipted: Date;
    generate_by: string;

    address_id: string;
    email_1: string;
    email_2: string;
    address_target: string;
    condition_prize: string;
    //เอกสารใบแจ้งหนี้
    address: string;
    payment_due: number;
    guarantee: number;
    product_detail_1: string;
    product_number_1: number;
    product_prize_1: number;
    product_detail_2: string;
    product_number_2: number;
    product_prize_2: number;
    product_total_prize: number;
    date: string;
    forwarder: string;
    type: RoleDocument;
    created_by: string;
    forwarder_position: string;
    type_income: string;
    success_time: string;
    note: string;
}

// ข้อมูลการสร้างไฟล์ทางการเงิน
export interface InInvoiceDocument {
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

export interface InProfile {
    username: string;
    firstname: string;
    lastname: string;
    position: string;
}

// ข้อมูลการสร้างไฟล์ใบแจ้งหนี้
export interface InInvoice {
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

// ข้อมูลใบส่งของ 
export interface InDelivery {
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

// ข้อมูลบันทึกข้อความ 
export interface InMessageMemos {
    id_doc: string;
    date: string;
    title: string;
    title_to: string;
    address: string;
    message: string;
    type: number;
    guarantor: string;
    guarantor_position: string;
    flag_status: FlagStatus;
    type_income: string;
}

export interface InModalChangePassword {
    origin_pass: string;
    new_pass: string;
    cnew_pass: string;
}


export interface InDocumentList {
    items: InDocuments[];
    totalItems: number;
}



export interface InDocumentSearch {
    searchText?: string;
    searchType?: string;

    startPage: number;
    limitPage: number;
}

export interface InDocumentSearchKey {
    key: string;
    value: string;
}

export interface InSuccessProcess {
    success_time: string;
    success_id_doc: string;
    note: string;
}



// ข้อมูลการแสดงสภานะการดำเนินงาน
export enum FlagStatus {
    Pending = 1,
    Success = 2,
}

//ข้อมูลประเภทของผู้ใช้
export enum RoleAccount {
    User = 1,
    Admin = 2

}

//ข้อมูลปรเภทของเอกสารแจ้งการชำระเงิน
export enum RoleDocument {
    Invoice = 1,
    InvoiceDocument = 2,
    Delivery = 3,
    MessageMemos = 4,
}


