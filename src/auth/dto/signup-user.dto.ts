import {
  // IsDate,
  // IsInt,
  // IsOptional,
  IsEmail,
  IsString,
  Length,
} from 'class-validator';

export class SignupUserDto {
  @IsString()
  @Length(6)
  password: string

  @IsEmail( undefined, { message: 'Invalid email'})
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