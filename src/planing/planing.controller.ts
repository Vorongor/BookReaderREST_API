import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { PlaningService } from './planing.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { UserDocument } from 'src/schemas/user.schema';
import { CreatePlanDto } from './dto/sreateplan.dto';

@Controller('planing')
export class PlaningController {
  constructor(private planService: PlaningService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('all')
  async getAll(@Req() req: Request, @Res() res: Response) {
    const user = req.user as UserDocument;
    const plans = await this.planService.getall(user._id);
    return res
      .status(200)
      .json({ data: plans, message: 'Plans has been fetched successfully.' });
  }

  @ApiTags('Training')
  @UseGuards(AuthGuard('jwt'))
  @Post('add')
  @ApiBearerAuth()
  async addPlan(
    @Req() req: Request,
    @Body() createPlanDto: CreatePlanDto,
    @Res() res: Response,
  ) {
    const user = req.user as UserDocument;
    const plan = await this.planService.create(user._id, createPlanDto);

    return res
      .status(201)
      .json({ data: plan, message: 'Plan has been updated successfully.' });
  }

  @ApiTags('Training')
  @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  @ApiBearerAuth()
  async deletePlan(
    @Req() req: Request,
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    const user = req.user as UserDocument;
    const plan = await this.planService.delete(user._id, id);
    return res
      .status(204)
      .json({ data: plan, message: 'Plan has been updated successfully.' });
  }
}
