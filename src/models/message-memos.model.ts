import { FlagStatus, InMessageMemos } from "src/interfaces/app.interface";

export class MessageMemosModel implements InMessageMemos {
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