import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Auth } from './interfaces/auth.interface';
import { SignupUserDto } from './dto/signup-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get('login')
    async findUserByEmail(@Body() LoginUserDto: LoginUserDto): Promise<boolean> {
        return this.authService.findUserByEmail(LoginUserDto);
    }

    @Post('signup')
    async createUser(@Body() SignupUserDto: SignupUserDto): Promise<Auth> {
        return this.authService.createUser(SignupUserDto);
    }
}
