import { BadRequestException, Injectable } from '@nestjs/common';
import { Training } from 'src/schemas/trainig.chemas';
import { TrainingModule } from './training.module';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTrainingDto } from './dto/training.dto';
import { Plan, PlanDocument } from 'src/schemas/planing.schema';

@Injectable()
export class TrainingService {
  constructor(
    @InjectModel(Plan.name) private planModel: Model<PlanDocument>,
    @InjectModel(Training.name) private trainingModel: Model<TrainingModule>,
  ) {}

  async create(createTrainingDto: CreateTrainingDto, userID): Promise<any> {
    const { time, result } = createTrainingDto;

    const plan = await this.planModel.findById(createTrainingDto.planID);

    if (plan.pagesReaded + result > plan.pages) {
      throw new BadRequestException(
        'You can not read more pages than book consist',
      );
    }

    const updatedPlan = await this.planModel.findByIdAndUpdate(
      createTrainingDto.planID,
      {
        pagesReaded: plan.pages + result,
      },
    );

    const createdTraining = new this.trainingModel({
      time,
      result,
      owner: userID,
      plan: updatedPlan._id,
    });
    await createdTraining.save();
    return createdTraining;
  }

  async getall(userID): Promise<any> {
    const resultList = this.trainingModel.find({ owner: userID });
    return resultList;
  }
}
