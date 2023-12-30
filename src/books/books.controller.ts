import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { UserDocument } from 'src/schemas/user.schema';
import { BooksService } from './books.service';
import { CreateBookDto, ReviewDto } from './dto/books.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreatePlanDto } from './dto/createplan.dto';
import { CreateTrainingDto } from './dto/training.dto';

@Controller('books')
export class BooksController {
  constructor(private bookService: BooksService) {}

  @ApiTags('Books')
  @UseGuards(AuthGuard('jwt'))
  @Get('all')
  @ApiBearerAuth()
  async getAll(@Req() req: Request, @Res() res: Response) {
    const user = req.user as UserDocument;
    const books = await this.bookService.getall(user._id);
    return res
      .status(200)
      .json({ data: books, message: 'Books retrieved successfully.' });
  }

  @ApiTags('Books')
  @UseGuards(AuthGuard('jwt'))
  @Post('add')
  @ApiBearerAuth()
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

  @ApiTags('Books')
  @UseGuards(AuthGuard('jwt'))
  @Post('plan/:id')
  @ApiBearerAuth()
  async addPlan(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() createPlanDto: CreatePlanDto,
    @Res() res: Response,
  ) {
    const user = req.user as UserDocument;
    const book = await this.bookService.createPlan(user._id, id, createPlanDto);
    return res
      .status(201)
      .json({ data: book, message: 'Book`s plan successfully added.' });
  }

  @ApiTags('Books')
  @UseGuards(AuthGuard('jwt'))
  @Post('training/:id')
  @ApiBearerAuth()
  async addTraining(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() createTrainingDto: CreateTrainingDto,
    @Res() res: Response,
  ) {
    const user = req.user as UserDocument;
    const book = await this.bookService.addTraining(
      user._id,
      id,
      createTrainingDto,
    );
    return res
      .status(201)
      .json({ data: book, message: 'Book`s training successfully added.' });
  }

  @ApiTags('Books')
  @UseGuards(AuthGuard('jwt'))
  @Get('book/:id')
  @ApiBearerAuth()
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

  @ApiTags('Books')
  @UseGuards(AuthGuard('jwt'))
  @Patch('book/:id')
  @ApiBearerAuth()
  async update(
    @Req() req: Request,
    @Body('state') state: string,
    @Body('pagesRead') pagesRead: number,
    @Param('id')
    id: string,
    @Res() res: Response,
  ) {
    const user = req.user as UserDocument;
    const book = await this.bookService.update(user._id, state, id, pagesRead);
    return res
      .status(201)
      .json({ data: book, message: 'Your book succssefully updated' });
  }

  @ApiTags('Books')
  @UseGuards(AuthGuard('jwt'))
  @Patch('review/:id')
  @ApiBearerAuth()
  async updateReview(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() review: ReviewDto,
    @Res() res: Response,
  ) {
    const user = req.user as UserDocument;
    const book = await this.bookService.updateReview(user._id, id, review);
    if (!book) {
      return res
        .status(404)
        .json({ message: 'Book not found or not owned by user.' });
    }
    return res
      .status(201)
      .json({ data: book, message: 'Book`s review update successfully.' });
  }

  @ApiTags('Books')
  @UseGuards(AuthGuard('jwt'))
  @Delete('book/:id')
  @ApiBearerAuth()
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
