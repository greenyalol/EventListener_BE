import { BadRequestException, Body, Injectable } from '@nestjs/common';
import { Auth } from 'src/auth/interfaces/auth.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUserDto } from 'src/auth/dto/update-user.dto';
import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<Auth>) { }

  async getUserInfo(id: string): Promise<Auth> {
    return await this.userModel.findById(id);
  }

  async updateUserInfo(id: string, user: UpdateUserDto, imageURL: string): Promise<Auth> {
    const existingUser = await this.userModel.findById(id);
    if (!existingUser) {
      throw new BadRequestException('User not found');
    }

    if (user.email != existingUser.email) {
      const anotherUser = await this.userModel.findOne({ email: user.email });
      if (anotherUser) {
        throw new BadRequestException('Email already exists');
      }
    }

    if (user.city) {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${user.city}&format=json`)
      const existingCity = await response.json();
      if (!existingCity[0]) {
        throw new BadRequestException('Invalid city name');
      }
      existingUser.city = user.city;
    }

    user.firstName ? existingUser.firstName = user.firstName : undefined;
    user.lastName ? existingUser.lastName = user.lastName : undefined;
    if (user.password) {
      const hash = await bcrypt.hash(user.password, saltOrRounds);
      existingUser.password = hash;
    }
    imageURL ? existingUser.imageURL = imageURL : undefined;
    user.email ? existingUser.email = user.email : undefined;
    user.bio ? existingUser.bio = user.bio : undefined;
    user.phone ? existingUser.phone = user.phone : undefined;
    user.interests ? existingUser.interests = user.interests : undefined;

    return await existingUser.save();
  }

  async getSavedEvents(id: string): Promise<Event[]> {
    return await this.userModel.findById(id).select('savedEvents').populate('savedEvents');
  }

  async getJoinedEvents(id: string): Promise<Event[]> {
    return await this.userModel.findById(id).select('joinedEvents').populate('joinedEvents');
  }

  async getUserById(id: string): Promise<Auth> {
    return await this.userModel.findById(id).select('firstName lastName city interests');
  }
}

