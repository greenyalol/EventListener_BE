import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    imageURL: { type: String },
    bio: String,
    city: String,
    interests: { type: [String], required: true },
    savedEvents: { type: [mongoose.SchemaTypes.ObjectId], ref: "Event", default: [], required: true },
    joinedEvents: { type: [mongoose.SchemaTypes.ObjectId], ref: "Event", default: [], required: true },
},
    {
        timestamps: true
    })