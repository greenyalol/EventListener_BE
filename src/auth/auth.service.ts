import { Injectable } from '@nestjs/common';
import { Auth } from './interfaces/auth.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
    constructor(@InjectModel('User') private readonly userModel: Model<Auth>) { }

    async findUserByEmail(email: string): Promise<Auth> {
        return await this.userModel.findOne({ email: email });
    }

    async addUser(email: string): Promise<Auth[]> {
        const doc = new this.userModel({
            email,
        })
        await doc.save()
        return await this.userModel.find();
    }
}

