import { InAccount, RoleAccount } from "src/interfaces/app.interface";

export class AccountModel implements InAccount {
    position: string;
    id: string;
    username: string;
    password: string;

    firstname: string;
    lastname: string;
    phone_number: string;
    role: RoleAccount;

}