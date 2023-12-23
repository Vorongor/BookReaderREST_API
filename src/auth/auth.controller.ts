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
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiTags('Auth')
  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  async register(@Body() createUserDto: CreateUserDto): Promise<any> {
    return this.authService.create(createUserDto);
  }

  @ApiTags('Auth')
  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiBody({ type: LoginUserDto })
  @ApiOperation({ summary: 'Log in a user' })
  async login(@Req() req) {
    return req.user;
  }

  @ApiTags('Auth')
  @Post('logout')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Log out a user' })
  async logout(@Req() req: Request, @Res() res: Response) {
    res.status(200).send('You Successfuly Log Out');
  }

  @ApiTags('Auth')
  @UseGuards(AuthGuard('jwt'))
  @Post('refresh')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Refresh users token' })
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
  @ApiTags('Auth')
  @Get('google')
  @ApiOperation({ summary: 'Log in a user with google' })
  @UseGuards(AuthGuard('google'))
  async googlelogin() {}

  @ApiTags('Auth')
  @Get('google/callback')
  @ApiOperation({ summary: 'Log in a user with google step 2' })
  @UseGuards(AuthGuard('google'))
  async callback(@Req() req, @Res() res) {
    res.json(req.user);
  }
}
