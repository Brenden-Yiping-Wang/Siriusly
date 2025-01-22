// user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Question extends Document {
  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;

  @Prop({ required: true })
  question: string;

  @Prop({ unique: true, default: () => require('uuid').v4() })
  question_id: string;

  @Prop({ type: [String] })
  choices: string[];

  @Prop({ type: [String] })
  tag_ids: string[];
}

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

export const QuestionSchema = SchemaFactory.createForClass(Question);
export const AnswerSchema = SchemaFactory.createForClass(Answer);
