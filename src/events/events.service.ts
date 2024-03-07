import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class EventsService {
    constructor(@InjectModel(Event.name) private eventModel: Model<Event>
    ) { }

    async getAll(): Promise<Event[]> {
        console.log(await this.eventModel.find({}).exec());
        
        return await this.eventModel.find().exec();
    }
}
