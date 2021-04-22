import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '@auth/auth.service';
import { LoginUserDto } from '@users/dto/login-user.dto';
import { RefreshTokenGuard } from '@auth/guards/refresh-token.guard';
import { UserFromToken } from '@auth/decorators/user-from-token.decorator';

@Controller('authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Post('refresh')
  @UseGuards(RefreshTokenGuard)
  async refresh(@UserFromToken('userId') userId: string) {
    return this.authService.refresh(userId);
  }

  @Get('logout')
  async logout(@UserFromToken('userId') userId: string) {
    return this.authService.logout(userId);
  }
}
