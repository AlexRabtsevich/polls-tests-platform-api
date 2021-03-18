import { Body, Controller, Get, Post, UseGuards, Param } from '@nestjs/common';

import { AccessTokenGuard } from '@auth/guards/access-token.guard';
import { UsersService } from '@users/users.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UserFromToken } from '@auth/decorators/user-from-token.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get('me')
  @UseGuards(AccessTokenGuard)
  async getMyProfile(@UserFromToken('userId') userId: string) {
    return this.usersService.findMyProfile(userId);
  }

  @Get(':id')
  @UseGuards(AccessTokenGuard)
  getProfile(@Param('id') id: string) {
    return this.usersService.findUserById(id);
  }
}
