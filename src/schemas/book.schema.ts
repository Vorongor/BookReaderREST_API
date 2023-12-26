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

  @Prop({ default: 0 })
  pagesRead: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: User;

  @Prop({
    type: {
      startTime: { type: Number, required: true },
      finishTime: { type: Number, required: true },
    },
    required: false,
  })
  plan: {
    startTime: number;
    finishTime: number;
  };

  @Prop({
    type: [
      {
        date: { type: Number, required: true },
        result: { type: Number, required: true },
      },
    ],
    default: [],
  })
  training: Array<{ date: number; result: number }>;

  @Prop({
    type: {
      rate: { type: Number, min: 1, max: 5, required: true },
      comment: { type: String, required: false },
    },
    required: false,
  })
  review: {
    rate: number;
    comment: string;
  };
}

export const BookSchema = SchemaFactory.createForClass(Book);
