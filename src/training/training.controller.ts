import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { TrainingService } from './training.service';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { CreateTrainingDto } from './dto/training.dto';
import { UserDocument } from 'src/schemas/user.schema';

@Controller('training')
export class TrainingController {
  constructor(private trainingService: TrainingService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('add')
  async add(
    @Req() req: Request,
    @Body() createTrainingDto: CreateTrainingDto,
    @Res() res: Response,
  ) {
    const user = req.user as UserDocument;
    const training = await this.trainingService.create(
      createTrainingDto,
      user._id,
    );
    return res
      .status(201)
      .json({ data: training, message: 'Training successfully added.' });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('all')
  async getAll(@Req() req: Request, @Res() res: Response) {
    const user = req.user as UserDocument;
    const trainingList = await this.trainingService.getall(user._id);
    return res
      .status(201)
      .json({
        data: trainingList,
        message: 'Training list successfully Fetched.',
      });
  }
}
