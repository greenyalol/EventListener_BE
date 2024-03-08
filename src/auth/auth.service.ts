import { Injectable, BadRequestException } from '@nestjs/common';
import { Auth } from './interfaces/auth.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignupUserDto } from './dto/signup-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

@Injectable()
export class AuthService {
    constructor(@InjectModel('User') private readonly userModel: Model<Auth>) { }

    async findUserByEmail(user: LoginUserDto): Promise<boolean> {
        const existingUser = await this.userModel.findOne({ email: user.email });
        if (!existingUser) {
            throw new BadRequestException('Incorrect email or password')
        }
        const isPassworddMatch = await bcrypt.compare(user.password, existingUser.password);
        if (!isPassworddMatch) {
            throw new BadRequestException('Incorrect email or password')
        }
        return isPassworddMatch;
    }

    async createUser(user: SignupUserDto): Promise<Auth> {

        const hash = await bcrypt.hash(user.password, saltOrRounds);
        user.password = hash;
        const newUser = new this.userModel(user);
        return await newUser.save();
    }
}

