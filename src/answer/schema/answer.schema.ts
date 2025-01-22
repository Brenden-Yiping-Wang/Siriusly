// user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Answer extends Document {
  @Prop({ required: true })
  user_id: string;

  @Prop({ required: true })
  question_id: string;

  @Prop({ required: true })
  answer: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;

  @Prop({ required: true })
  is_answered: boolean;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);
