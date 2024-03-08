import {
  // IsDate,
  // IsInt,
  // IsOptional,
  IsString,
  // Min,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  password: string

  @IsString()
  email: string

  // @IsString()
  // address: string

  // @IsString()
  // topic: string

  // @IsString()
  // @IsOptional()
  // place: string

  // @IsString()
  // category: string;

  // @IsInt()
  // @Min(2)
  // @IsOptional()
  // membersAmount: number

  // @IsInt()
  // @IsOptional()
  // budget: number
}