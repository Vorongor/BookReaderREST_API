import { Injectable } from '@nestjs/common';
import { Training } from 'src/schemas/trainig.chemas';
import { TrainingModule } from './training.module';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTrainingDto } from './dto/training.dto';

@Injectable()
export class TrainingService {
  constructor(
    @InjectModel(Training.name) private trainingModel: Model<TrainingModule>,
  ) {}

  async create(createTrainingDto: CreateTrainingDto, userID): Promise<any> {
    const { time, result } = createTrainingDto;
    const createdTraining = new this.trainingModel({
      time,
      result,
      owner: userID,
    });
    await createdTraining.save();
    return createdTraining;
  }

  async getall(userID): Promise<any> {
    const resultList = this.trainingModel.find({ owner: userID });
    return resultList;
  }
}
