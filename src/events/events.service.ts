import { Injectable, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventsService {
    constructor(@InjectModel(Event.name) private eventModel: Model<Event>
    ) { }

    async getAll(): Promise<Event[]> {
        return await this.eventModel.find().exec();
    }

    async getEventByID(id: string): Promise<Event> {
        return await this.eventModel.findOne({ _id: id }).exec();
    }

    async getEventsByCreator(id: string): Promise<Event[]> {
        return await this.eventModel.find({ creator: id }).exec();
    }

    async createEvent(event: CreateEventDto): Promise<Event> {
        const newEvent = new this.eventModel(event);
        return await newEvent.save();
    }

    async updateEvent(id: string, event: CreateEventDto): Promise<Event> {
        return await this.eventModel.findByIdAndUpdate(id, event, { new: true });
    }

    async deleteEvent(id: string): Promise<Event> {
        return await this.eventModel.findByIdAndDelete(id);
    }
}
