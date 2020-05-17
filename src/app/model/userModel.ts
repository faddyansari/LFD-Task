import { Role } from "./roleModel";

export class User {
    id: number;
    username: string;
    password: string;
    role: Role;
    token?: string;
}