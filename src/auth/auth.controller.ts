import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '@auth/auth.service';
import { LoginUserDto } from '@users/dto/login-user.dto';
import { RefreshTokenGuard } from '@auth/guards/refresh-token.guard';

@Controller('authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Post('refresh')
  @UseGuards(RefreshTokenGuard)
  async refresh(@Req() request) {
    console.log(request.user);

    return this.authService.refresh(request.user);
  }
}
