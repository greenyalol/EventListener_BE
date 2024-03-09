import {
    IsDate,
    IsDateString,
    IsInt,
    IsOptional,
    IsString,
    Min,
} from 'class-validator';
import { Auth } from 'src/auth/interfaces/auth.interface';

export class UpdateEventDto {
    @IsDateString()
    @IsOptional()
    date: Date

    @IsString()
    @IsOptional()
    address: string

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