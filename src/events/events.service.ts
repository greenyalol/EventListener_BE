import { Injectable, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Auth } from 'src/auth/interfaces/auth.interface';

@Injectable()
export class EventsService {
    constructor(
        @InjectModel(Event.name) private eventModel: Model<Event>,
        @InjectModel('User') private readonly userModel: Model<Auth>
    ) { }

    async getAll(): Promise<Event[]> {
        return await this.eventModel.find().exec();
    }

    async getEventByID(id: string): Promise<Event> {
        return await this.eventModel.findOne({ _id: id }).populate('joinedBy').populate('creator').exec();
    }

    async getEventsByCreator(id: string): Promise<Event[]> {
        return await this.eventModel.find({ creator: id }).exec();
    }

    async createEvent(event: CreateEventDto): Promise<Event> {
        const newEvent = new this.eventModel(event);
        return await newEvent.save();
    }

    async updateEvent(id: string, event: UpdateEventDto): Promise<Event> {
        return await this.eventModel.findByIdAndUpdate(id, event, { new: true });
    }

    async deleteEvent(id: string): Promise<Event> {
        return await this.eventModel.findByIdAndDelete(id);
    }

    async joinEvent(eventID: string, userID: string): Promise<Event> {
        await this.userModel.findByIdAndUpdate(userID, { $push: { "joinedEvents": eventID } });
        return await this.eventModel.findByIdAndUpdate(eventID, { $push: { "joinedBy": userID } }, { new: true });
    }

    async leaveEvent(eventID: string, userID: string): Promise<Event> {
        await this.eventModel.findByIdAndUpdate(userID, { $pull: { "joinedEvents": eventID } });
        return await this.eventModel.findByIdAndUpdate(eventID, { $pull: { "joinedBy": userID } }, { new: true });
    }

    async isMember(userID: string, eventID: string): Promise<Event> {
        return await this.eventModel.findOne({ "_id": eventID, "joinedBy": userID });
    }

    async isExpire(eventID: string): Promise<Event> {
        const now = Date.now();
        return await this.eventModel.findOne({ "_id": eventID, "date": { $lt: now } });
    }

    async isCreator(userID: string, eventID: string): Promise<Event> {
        return await this.eventModel.findOne({ "_id": eventID, "creator": userID });
    }

    async saveEvent(eventID: string, userID: string): Promise<Event> {
        await this.userModel.findByIdAndUpdate(userID, { $push: { "savedEvents": eventID } });
        return await this.eventModel.findByIdAndUpdate(eventID, { $push: { "savedBy": userID } }, { new: true });
    }

    async unsaveEvent(eventID: string, userID: string): Promise<Event> {
        await this.eventModel.findByIdAndUpdate(userID, { $pull: { "savedEvents": eventID } });
        return await this.eventModel.findByIdAndUpdate(eventID, { $pull: { "savedBy": userID } }, { new: true });
    }

    async isSaved(userID: string, eventID: string): Promise<Event> {
        return await this.eventModel.findOne({ "_id": eventID, "savedBy": userID });
    }

}
