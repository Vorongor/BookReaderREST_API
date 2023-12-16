import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Req,
  Res,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { UserDocument } from 'src/schemas/user.schema';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<any> {
    return this.authService.create(createUserDto);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req) {
    return req.user;
  }

  @Post('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    res.status(200).send('You Successfuly Log Out');
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('refresh')
  async refreshToken(@Req() req: Request, @Res() res: Response) {
    const user = req.user as UserDocument;

    try {
      const data = await this.authService.refreshToken(user._id);
      res.status(200).json({
        message: 'Refresh success',
        data,
      });
    } catch (e) {
      res.status(401).json({ message: 'Invalid token' });
    }
  }

  // IN PROGRES
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googlelogin() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async callback(@Req() req, @Res() res) {
    res.json(req.user);
  }
}
