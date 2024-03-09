import {
  IsOptional,
  IsEmail,
  IsString,
  Length,
  IsMobilePhone,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @Length(6)
  @IsOptional()
  password: string

  @IsEmail(undefined, { message: 'Invalid email' })
  @IsOptional()
  email: string

  @IsString()
  @Length(1)
  @IsOptional()
  firstName: string

  @IsString()
  @Length(1)
  @IsOptional()
  lastName: string

  @IsMobilePhone()
  @IsOptional()
  phone: string

  @IsString()
  @IsOptional()
  bio: string;

  @IsString({ each: true })
  @IsOptional()
  interests: string[]
}