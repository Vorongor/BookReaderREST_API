import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from './user.schema';
import { Book } from './book.schema';

export type PlanDocument = Document & Plan;

@Schema({ timestamps: true })
export class Plan {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Book' })
  book: Book;

  @Prop({ required: true })
  startTime: number;

  @Prop({ required: true })
  @Prop({ required: true })
  pages: number;

  @Prop({ required: true })
  pagesReaded: number;
}

export const PlanSchema = SchemaFactory.createForClass(Plan);
