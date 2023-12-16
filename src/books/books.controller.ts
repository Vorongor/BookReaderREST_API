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
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { UserDocument } from 'src/schemas/user.schema';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/books.dto';
import { Book } from 'src/schemas/book.schema';

@Controller('books')
export class BooksController {
  constructor(private bookService: BooksService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('add')
  async addBook(
    @Req() req: Request,
    @Body() createBookDto: CreateBookDto,
    @Res() res: Response,
  ) {
    const user = req.user as UserDocument;
    const book = await this.bookService.create(createBookDto, user._id);
    return res
      .status(201)
      .json({ data: book, message: 'Book successfully added.' });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('all')
  async getAll(@Req() req: Request, @Res() res: Response) {
    const user = req.user as UserDocument;
    const books = await this.bookService.getall(user._id);
    return res
      .status(200)
      .json({ data: books, message: 'Books retrieved successfully.' });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('book/:id')
  async getCurrent(
    @Req() req: Request,
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    const user = req.user as UserDocument;
    const book = await this.bookService.current(user._id, id);
    return res
      .status(200)
      .json({ data: book, message: 'Book retrieved successfully.' });
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('book/:id')
  async delete(
    @Req() req: Request,
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    const user = req.user as UserDocument;
    await this.bookService.delete(user._id, id);
    return res.status(200).json({ message: 'Book successfully deleted.' });
  }
}
