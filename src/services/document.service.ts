import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { InFinancialDocument, InDelivery, InInvoice, InInvoiceDocument, InMessageMemos, InDocumentSearch, InDocumentList, InSuccessProcess, RoleDocument, FlagStatus } from "src/interfaces/app.interface";
import { InDocuments } from "src/interfaces/document.interface";

@Injectable()
export class DocumentService {
    constructor(
        @InjectModel('documents') private DocCollection: Model<InDocuments>,
    ) { }

    // สร้างใบส่งของ
    async onCreateDelivery(body: InDelivery, created_by: string) {
        console.log('onCreateDelivery');
        const model: InDelivery = body;

        try {
            const modelItem = await this.DocCollection.create(model);
            modelItem.id = modelItem._id;
            modelItem.created_by = created_by;
            modelItem.flag_status = 1;
            const modelItem2 = await this.DocCollection.create(modelItem);
            return modelItem2;

        } catch (err) {
            throw new BadRequestException(err.Message);
        }

    }

    // สร้างใบแจ้งหนี้
    async onCreateInvoice(body: InInvoice, created_by: string) {
        console.log('onCreateInvoice');
        const model: InInvoice = body;

        try {
            const modelItem = await this.DocCollection.create(model);
            modelItem.id = modelItem._id;
            modelItem.created_by = created_by;
            modelItem.flag_status = 1;
            const modelItem2 = await this.DocCollection.create(modelItem);
            return modelItem2;
        } catch (err) {
            throw new BadRequestException(err.Message);
        }

    }

    // สร้างเอกสารแจ้งหนี้
    async onCreateInvoiceDocument(body: InInvoiceDocument, created_by: string) {
        console.log('onCreateInvoiceDocument');
        const model: InInvoiceDocument = body;
        try {
            const modelItem = await this.DocCollection.create(model);
            modelItem.id = modelItem._id;
            modelItem.created_by = created_by;
            modelItem.flag_status = 1;
            const modelItem2 = await this.DocCollection.create(modelItem);
            return modelItem2;
        } catch (err) {
            throw new BadRequestException(err.Message);

        }

    }

    // สร้างเอกสารบันทึกข้อความ
    async onCreateMessageMemos(body: InMessageMemos, created_by: string) {
        console.log('onCreateMessageMemos');
        const model: InMessageMemos = body;

        try {
            const modelItem = await this.DocCollection.create(model);
            modelItem.id = modelItem._id;
            modelItem.created_by = created_by;
            modelItem.flag_status = 1;
            const modelItem2 = await this.DocCollection.create(modelItem);
            return modelItem2;
        } catch (err) {
            throw new BadRequestException(err.Message);
        }


    }

    // async setUpdatedVariable(text: string) {
    //     const searchDate: { from: Date, to: Date } = { from: new Date(text), to: new Date(text) };
    //     searchDate.from.setHours(0);
    //     searchDate.from.setMinutes(0);
    //     searchDate.from.setSeconds(0);
    //     searchDate.to.setHours(23);
    //     searchDate.to.setMinutes(59);
    //     searchDate.to.setSeconds(59);
    //     return searchDate;
    // }

    // แสดงข้อมูลเอกสาร

    async getDocumentItems(searchOption: InDocumentSearch): Promise<InDocumentList> {
        console.log('getDocumentItems');
        try {
            let queryItemFunction = () => this.DocCollection.find({}, { _id: false });

            //ส่วนของการค้นหา
            if (searchOption.searchText && searchOption.searchType) {
                const text = searchOption.searchText;
                const type = searchOption.searchType;
                const conditions = {};
                switch (type) {
                    case 'type':
                        console.log('case: type');
                        console.log('text: ' + text);
                        queryItemFunction = () => this.DocCollection.find({
                            type: parseInt(text),
                        }, { _id: false });
                        break;
                    case 'date':
                        console.log('case: date');
                        console.log('text : ' + text);
                        let t = new Date(text);
                        console.log('date : ' + t);

                        queryItemFunction = () => this.DocCollection.find({
                            date: text,
                        }, { _id: false });
                        break;
                    case 'beetween':
                        console.log('case : beetween');
                        console.log('text[from] : ' + text['from']);
                        console.log('text[to] : ' + text['to']);

                        queryItemFunction = () => this.DocCollection.find({
                            created_date: {
                                $gt: text['from'],
                                $lt: text['to']
                            },
                        }, {
                            _id: false,
                        });
                        break;
                    case 'updated':
                        console.log('case: updated');
                        queryItemFunction = () => this.DocCollection.find({
                            created_time: text,
                        }, { _id: false });
                        break;
                    case 'status':
                        console.log('case: status');
                        console.log('text: ' + text);
                        queryItemFunction = () => this.DocCollection.find({
                            flag_status: parseInt(text),
                        }, { _id: false });
                        break;
                    default:
                        console.log('case: default');
                        conditions[type] = new RegExp(text, 'i');
                        queryItemFunction = () => this.DocCollection.find(conditions);
                        break;
                }
            }

            // แบ่งหน้าเพจ
            const items = await queryItemFunction()
                .sort({ updated: -1 })
                .skip((searchOption.startPage - 1) * searchOption.limitPage)
                .limit(searchOption.limitPage);
            //ผลรวมของรายการเอกสารทั้งหมด
            const totalItems = await queryItemFunction().countDocuments({});
            // console.log({ items, totalItems});
            return { items, totalItems };
        } catch (err) {
            console.log('function getDocuments : ' + err.Message)
            throw new BadRequestException('function getDocuments : ' + err.Message);

        }

    }

    //แสดงข้อมูลเอกสารเดี่ยว
    async getDocumentItem(documentID: any) {
        console.log('getDocumentItem');
        try {
            const documentItem = await this.DocCollection.findById(documentID);
            return documentItem;
        } catch (err) {
            throw new BadRequestException(err.Message);
        }
    }

    //ลบข้อมูลรายการเอกสาร
    async deleteDocumentItem(documentID: any) {
        console.log('deleteDocumentItem');
        try {
            // console.log( 'type: '+ typeof documentID + ' value:' +  documentID)
            return await this.DocCollection.deleteOne({ id: documentID });

        } catch (err) {
            throw new BadRequestException(err.Message);

        }

    }

    async updateFlagStatus(documentID: number, body: InSuccessProcess, success_by: string) {
        console.log(`updateFlagStatus`);
        const documentUpdate = await this.DocCollection.findById(documentID);
        if (!documentUpdate) throw new BadRequestException('ไม่มีข้อมูลนี้ในระบบ');
        try {
            // if (documentUpdate.id_doc != body.success_id_doc)
            //     throw new BadRequestException(`เลขที่เอกสารไม่ตรง กรุณากรอกใหม่`);
            return await this.DocCollection.updateOne({ id: documentID }, {
                flag_status: 2,
                note: body.note,
                success_time: body.success_time,
                success_by: success_by,
            });
        } catch (err) {
            throw new BadRequestException(err.Message);
        }

    }



}