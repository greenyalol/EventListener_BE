import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Auth } from './interfaces/auth.interface';
import { Token } from './interfaces/token.interface';
import { SignupUserDto } from './dto/signup-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async loginUser(@Body() LoginUserDto: LoginUserDto): Promise<Token> {
        return this.authService.loginUser(LoginUserDto);
    }

    @Post('signup')
    async createUser(@Body() SignupUserDto: SignupUserDto): Promise<Token> {
        return this.authService.createUser(SignupUserDto);
    }
}
