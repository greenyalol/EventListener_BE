import {
    IsString,
} from 'class-validator';

export class JoinEventDto {
    @IsString()
    id: string
}