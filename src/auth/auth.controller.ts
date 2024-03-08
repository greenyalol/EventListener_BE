import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Auth } from './interfaces/auth.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get('login/:email')
    async findUserByEmail(@Param('email') email): Promise<Auth> {
        return this.authService.findUserByEmail(email);
    }

    @Post('signup')
    async createUser(@Body() CreateUserDto: CreateUserDto): Promise<Auth> {
        return this.authService.createUser(CreateUserDto);
    }
}
