import { Injectable, BadRequestException } from '@nestjs/common';
import { Auth } from './interfaces/auth.interface';
import { Token } from './interfaces/token.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignupUserDto } from './dto/signup-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

const saltOrRounds = 10;

@Injectable()
export class AuthService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<Auth>,
        private jwtService: JwtService
    ) { }

    async loginUser(user: LoginUserDto): Promise<Token> {
        const existingUser = await this.userModel.findOne({ email: user.email });
        if (!existingUser) {
            throw new BadRequestException('Incorrect email or password');
        }

        const isPassworddMatch = await bcrypt.compare(user.password, existingUser.password);
        if (!isPassworddMatch) {
            throw new BadRequestException('Incorrect email or password');
        }

        const payload = { email: existingUser.email, id: existingUser._id };

        return {
            access_token: this.jwtService.sign(payload),
            user_id: existingUser._id,
            firstName: existingUser.firstName,
        };
    }

    async createUser(user: SignupUserDto, imageURL: string): Promise<Token> {

        const existingUser = await this.userModel.findOne({ email: user.email });
        if (existingUser) {
            throw new BadRequestException('Email already exists');
        }

        const hash = await bcrypt.hash(user.password, saltOrRounds);
        user.password = hash;
        imageURL ? user.imageURL = imageURL : undefined;
        const doc = new this.userModel(user);
        const newUser = await doc.save();
        const payload = { email: newUser.email, id: newUser._id };

        return {
            access_token: this.jwtService.sign(payload),
            user_id: existingUser._id,
            firstName: existingUser.firstName,
        };
    }
}

