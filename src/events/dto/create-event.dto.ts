import {
    IsDate,
    IsDateString,
    IsInt,
    IsOptional,
    IsString,
    Min,
} from 'class-validator';

export class CreateEventDto {
    @IsString()
    creator: string //change to user

    @IsDateString()
    date: Date

    @IsString()
    address: string

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