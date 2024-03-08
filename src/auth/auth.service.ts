import { Injectable } from '@nestjs/common';
import { Auth } from './interfaces/auth.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(@InjectModel('User') private readonly userModel: Model<Auth>) { }

    async findUserByEmail(email: string): Promise<Auth> {
        return await this.userModel.findOne({ email: email });
    }

    async createUser(user: CreateUserDto): Promise<Auth> {
        const newUser = new this.userModel(user)
        return await newUser.save()
    }
}

