import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from 'src/schemas/book.schema';

import { CreateBookDto } from './dto/books.dto';
import { CreatePlanDto } from './dto/createplan.dto';
import { CreateTrainingDto } from './dto/training.dto';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  async create(createBookDto: CreateBookDto, userID: string): Promise<Book> {
    const createdBook = new this.bookModel({
      ...createBookDto,
      owner: userID,
    });

    await createdBook.save();
    return createdBook;
  }

  async createPlan(
    userID: string,
    bookID: string,
    createPlanDto: CreatePlanDto,
  ): Promise<Book> {
    const book = this.bookModel.findOneAndUpdate(
      {
        _id: bookID,
        owner: userID,
      },
      {
        plan: {
          startTime: createPlanDto.startTime,
          finishTime: createPlanDto.finishTime,
        },
        state: 'reading',
      },
      { new: true },
    );
    if (!book) {
      throw new NotFoundException(`Book with ID ${bookID} not found`);
    }

    return book;
  }

  async addTraining(
    userID: string,
    bookID: string,
    createTrainingDto: CreateTrainingDto,
  ): Promise<Book> {
    const book = await this.bookModel.findOne({
      _id: bookID,
      owner: userID,
    });

    if (!book.plan) {
      throw new BadRequestException('Here no plan for reading this book');
    }

    const updatedBook = await this.bookModel.findOneAndUpdate(
      {
        _id: bookID,
        owner: userID,
      },
      {
        training: [
          ...book.training,
          { date: createTrainingDto.date, result: createTrainingDto.result },
        ],
        state: 'reading',
      },
      { new: true },
    );
    await updatedBook.save();

    return updatedBook;
  }

  async getall(userID: string): Promise<Book[]> {
    const library = await this.bookModel.find({ owner: userID });
    return library;
  }

  async current(userID: string, bookID: string): Promise<any> {
    const book = await this.bookModel.find({ _id: bookID, owner: userID });
    if (!book) {
      throw new NotFoundException(`Book with ID ${bookID} not found`);
    }
    return book;
  }

  async update(
    userID: string,
    state: string,
    bookID: string,
    pagesRead: number,
  ): Promise<any> {
    let book;
    if (state) {
      book = await this.bookModel.findOneAndUpdate(
        {
          _id: bookID,
          owner: userID,
        },
        { state },
        { new: true },
      );
      if (!book) {
        throw new NotFoundException(`Book with ID ${bookID} not found`);
      }
    }
    if (pagesRead) {
      book = await this.bookModel.findOneAndUpdate(
        {
          _id: bookID,
          owner: userID,
        },
        { pagesRead },
        { new: true },
      );
      if (!book) {
        throw new NotFoundException(`Book with ID ${bookID} not found`);
      }
    }

    await book.save();
    return book;
  }

  async updateReview(userID: string, bookID: string, review): Promise<any> {
    const book = await this.bookModel.findOneAndUpdate(
      { _id: bookID, owner: userID },
      { review },
      { new: true },
    );
    if (!book) {
      throw new NotFoundException(`Book with ID ${bookID} not found`);
    }

    return book;
  }

  async delete(userID: string, bookID: string): Promise<any> {
    const book = await this.bookModel.findOneAndDelete({
      _id: bookID,
      owner: userID,
    });
    if (!book) {
      throw new NotFoundException(`Book with ID ${bookID} not found`);
    }
    return book;
  }
}
