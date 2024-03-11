/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema } from 'src/schemas/event.schema';
import { UserSchema } from 'src/schemas/user.schema';

@Module({
    imports: [MongooseModule.forFeature([
        { name: Event.name, schema: EventSchema },
        { name: 'User', schema: UserSchema }
    ])],
    providers: [EventsService],
    controllers: [EventsController]

})
export class EventsModule { }
