import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from 'src/schemas/book.schema';
import { Plan, PlanDocument } from 'src/schemas/planing.schema';

@Injectable()
export class PlaningService {
  constructor(
    @InjectModel(Plan.name) private planModel: Model<PlanDocument>,
    @InjectModel(Book.name) private bookModel: Model<BookDocument>,
  ) {}

  async getall(userID) {
    const plans = await this.planModel.find({ owner: userID });
    if (plans.length === 0) {
      throw new BadRequestException('Can`n Found any plans');
    }
    return plans;
  }

  async create(userID, createPlanDto): Promise<any> {
    const book = await this.bookModel.findOneAndUpdate(
      {
        _id: createPlanDto.bookID,
        owner: userID,
      },
      { state: 'reading' },
      { new: true },
    );

    const createPlan = new this.planModel({
      owner: userID,
      book: book._id,
      pages: book.pages,
      startTime: createPlanDto.startTime,
      finishTime: createPlanDto.finishTime,
      pagesReaded: 0,
    });
    await createPlan.save();
    return createPlan;
  }

  async delete(userID, planID): Promise<any> {
    const plan = await this.planModel.findOneAndDelete({
      _id: planID,
      owner: userID,
    });

    return plan;
  }
}
