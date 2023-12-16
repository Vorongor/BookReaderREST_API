import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from './user.schema';

export type BookDocument = Document & Book;

@Schema({ timestamps: true })
export class Book {
  @Prop({ unique: true, required: true })
  title: string;

  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  pages: number;

  @Prop({ required: true })
  year: number;

  @Prop({
    default: 'new',
    enum: ['new', 'reading', 'finished', 'canceled'],
  })
  state: string;

  @Prop({})
  pagesRead: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: User;
}

export const BookSchema = SchemaFactory.createForClass(Book);
