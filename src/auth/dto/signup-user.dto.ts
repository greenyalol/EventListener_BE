import {
  IsOptional,
  IsEmail,
  IsString,
  Length,
  IsMobilePhone,
} from 'class-validator';

export class SignupUserDto {
  @IsString()
  @Length(6)
  password: string

  @IsEmail(undefined, { message: 'Invalid email' })
  email: string

  @IsString()
  @Length(1)
  firstName: string

  @IsString()
  @Length(1)
  lastName: string

  @IsMobilePhone()
  phone: string

  @IsString()
  @IsOptional()
  bio: string

  @IsString()
  @IsOptional()
  city: string

  @IsString()
  @IsOptional()
  imageURL: string

  @IsString({ each: true })
  interests: string[]
}