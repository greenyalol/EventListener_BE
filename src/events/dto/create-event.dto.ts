import {
    IsArray,
    IsDate,
    IsDateString,
    IsInt,
    IsObject,
    IsOptional,
    IsString,
    Min,
} from 'class-validator';
import { Auth } from 'src/auth/interfaces/auth.interface';

export class Address {
    @IsString()
    type: string

    @IsArray()
    coordinates: number[]
}

export class CreateEventDto {
    @IsString()
    creator: string //change to user

    @IsDateString()
    date: Date

    @IsObject()
    address: Address

    @IsString()
    topic: string

    @IsString()
    @IsOptional()
    place: string

    @IsString()
    category: string;

    @IsInt()
    @Min(2)
    @IsOptional()
    membersAmount: number

    @IsInt()
    @IsOptional()
    budget: number
}