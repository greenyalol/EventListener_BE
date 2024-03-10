import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthService } from './auth.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Auth } from './interfaces/auth.interface';
import { Token } from './interfaces/token.interface';
import { SignupUserDto } from './dto/signup-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly cloudinaryService: CloudinaryService
    ) { }

    @Post('login')
    async loginUser(@Body() LoginUserDto: LoginUserDto): Promise<Token> {
        return this.authService.loginUser(LoginUserDto);
    }

    @Post('signup')
    @UseInterceptors(FileInterceptor('file'))
    async createUser(@Body() SignupUserDto: SignupUserDto, @UploadedFile() file: Express.Multer.File): Promise<Token> {
        const imageURL = await this.cloudinaryService.uploadFile(file)
        return this.authService.createUser(SignupUserDto, imageURL);
    }
}
