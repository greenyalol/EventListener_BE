import { Controller, Get, UseGuards, Request, Put, Body, UploadedFile, UseInterceptors, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Auth } from 'src/auth/interfaces/auth.interface';
import { UpdateUserDto } from 'src/auth/dto/update-user.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,
    private readonly cloudinaryService: CloudinaryService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getUserInfo(@Request() req): Promise<Auth> {
    return this.usersService.getUserInfo(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('profile')
  @UseInterceptors(FileInterceptor('file'))
  async updateUserInfo(@Body() UpdateUserDto: UpdateUserDto, @Request() req, @UploadedFile() file: Express.Multer.File): Promise<Auth> {
    const imageURL = await this.cloudinaryService.uploadFile(file)
    return this.usersService.updateUserInfo(req.user.id, UpdateUserDto, imageURL);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile/saved')
  getSavedEvents(@Request() req): Promise<Event[]> {
    return this.usersService.getSavedEvents(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile/joined')
  getJoinedEvents(@Request() req): Promise<Event[]> {
    return this.usersService.getJoinedEvents(req.user.id);
  }

  @Get(':id')
  async getUserById(@Param() params: any): Promise<Auth> {
    return this.usersService.getUserById(params.id);
  }
}
