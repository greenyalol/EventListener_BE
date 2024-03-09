import {
  IsEmail,
  IsString,
  IsNotEmpty
} from 'class-validator';

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  password: string

  @IsEmail()
  email: string
}