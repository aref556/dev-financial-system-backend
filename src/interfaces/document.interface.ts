import { InFinancialDocument, InInvoice } from "./app.interface";
import {Document} from 'mongoose'

export interface InDocuments extends InFinancialDocument, Document {

}