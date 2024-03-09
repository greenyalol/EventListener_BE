import { Controller, Get, UseGuards, Request, Put, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Auth } from 'src/auth/interfaces/auth.interface';
import { UpdateUserDto } from 'src/auth/dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getUserInfo(@Request() req): Promise<Auth> {
    return this.usersService.getUserInfo(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('profile')
  updateUserInfo(@Body() UpdateUserDto: UpdateUserDto, @Request() req): Promise<Auth> {
    return this.usersService.updateUserInfo(req.user.id, UpdateUserDto);
  }
}
