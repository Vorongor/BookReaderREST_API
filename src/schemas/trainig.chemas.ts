import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from './user.schema';
import { Plan } from './planing.schema';

export type TrainingDocument = Document & Training;

@Schema({ timestamps: true })
export class Training {
  @Prop({ required: true, default: () => Math.floor(Date.now() / 1000) })
  time: number;

  @Prop({ required: true })
  result: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Plan' })
  plan: Plan;
}

export const TrainingSchema = SchemaFactory.createForClass(Training);
