import { Document } from "mongoose";
import { InAccount } from "./app.interface";


export interface InUserDocument extends InAccount, Document {

}