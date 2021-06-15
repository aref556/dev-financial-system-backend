import { Document } from 'mongoose';

export interface InAccessTokenDocument extends Document {
    userID: any;
    accessToken: string;
    exprise: Date;
    created: Date;
}