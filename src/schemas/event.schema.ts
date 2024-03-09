/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Auth } from 'src/auth/interfaces/auth.interface';

export type EventDocument = HydratedDocument<Event>;

@Schema()
export class Event {
    // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    // creator: Auth //need change to user
    @Prop({type: String})
    creator: string //change to user 

    @Prop({ type: Date, required: true })
    date: Date

    @Prop({ required: true, type: String })
    address: string

    @Prop({ required: true, type: String })
    topic: string

    @Prop({ type: String })
    place: string

    @Prop({ required: true, type: [String] })
    category: string[];

    // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
    // joinedBy: Auth[] //need change to user
    @Prop({type: [String]})
    joinedBy: string[] //change to user 

    @Prop({type: Number})
    membersAmount: number

    @Prop({type: Number})
    budget: number 

}

export const EventSchema = SchemaFactory.createForClass(Event);