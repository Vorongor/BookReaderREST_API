import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { UserDocument } from 'src/schemas/user.schema';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiTags('User')
  @UseGuards(AuthGuard('jwt'))
  @Get('test')
  async test(@Req() req: Request, @Res() res: Response) {
    const user = req.user as UserDocument;
    console.log(user._id);
    res.status(200).json({
      message: 'Test Success',
      uid: user._id,
    });
  }

  @ApiTags('User')
  @UseGuards(AuthGuard('jwt'))
  @Get('info')
  async getInfo(@Req() req: Request, @Res() res: Response) {
    const user = req.user as UserDocument;
    console.log(user._id);
    res.status(200).json({
      message: 'User info fetched ',
      user,
    });
  }
}
