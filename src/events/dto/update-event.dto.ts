import {
    IsDate,
    IsDateString,
    IsInt,
    IsObject,
    IsOptional,
    IsString,
    Min,
} from 'class-validator';
import { Auth } from 'src/auth/interfaces/auth.interface';
import { Address } from './create-event.dto';

export class UpdateEventDto {
    @IsDateString()
    @IsOptional()
    date: Date

    @IsObject()
    @IsOptional()
    address: Address

    @IsString()
    @IsOptional()
    topic: string

    @IsString()
    @IsOptional()
    place: string

    @IsString()
    @IsOptional()
    category: string;

    @IsInt()
    @Min(2)
    @IsOptional()
    membersAmount: number

    @IsInt()
    @IsOptional()
    budget: number
}