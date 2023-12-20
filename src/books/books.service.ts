import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from 'src/schemas/book.schema';
import { User, UserDocument } from 'src/schemas/user.schema';
import { CreateBookDto } from './dto/books.dto';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  async create(createBookDto: CreateBookDto, userID): Promise<Book> {
    const createdBook = new this.bookModel({
      ...createBookDto,
      owner: userID,
    });

    await createdBook.save();
    return createdBook;
  }

  async getall(userID): Promise<Book[]> {
    const library = await this.bookModel.find({ owner: userID });
    return library;
  }

  async current(userID, bookID): Promise<any> {
    const book = await this.bookModel.find({ _id: bookID, owner: userID });
    return book;
  }

  async update(userID, state, bookID, pagesRead): Promise<any> {
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
    }

    await book.save();
    return book;
  }

  async updateReview(userID, bookID, review): Promise<any> {
    const book = await this.bookModel.findOneAndUpdate(
      { _id: bookID, owner: userID },
      { review },
      { new: true },
    );

    return book;
  }

  async delete(userId, bookID): Promise<any> {
    const book = await this.bookModel.findOneAndDelete({
      _id: bookID,
      owner: userId,
    });
    return book;
  }
}
