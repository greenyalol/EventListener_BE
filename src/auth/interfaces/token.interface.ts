import { ObjectId } from "mongoose";

export interface Token {
    access_token: string;
    user_id: any,
    firstName: string,
}