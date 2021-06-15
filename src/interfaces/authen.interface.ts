import { InUserDocument } from "./user.interface";


export interface Authenticated {
    generateAccessToken(user: InUserDocument): Promise<string>;
    validateUser(accessToken): Promise<InUserDocument>;
}