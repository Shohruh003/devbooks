import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuards } from './guards/local.guards';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';
import { JwtGuards } from './guards/jwt.guards';

@Controller('auth')
@ApiTags('Author')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signup(@Req() req: Request, @Body() body: SignUpDto) {
    return this.authService.create(body);
  }

  @UseGuards(JwtGuards)
  @Post('signin')
  signin(@Req() req: Request, @Body() body: SignInDto) {
    return 'ok signin';
  }
}
