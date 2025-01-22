import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { Answer } from './schema/answer.schema';

@Injectable()
export class AnswerService {
  constructor(@InjectModel(Answer.name) private answerModel: Model<Answer>) {}

  // Create a new answer
  async create(createAnswerDto: CreateAnswerDto): Promise<Answer> {
    const newAnswer = new this.answerModel(createAnswerDto);
    return newAnswer.save();
  }

  // Find all answers
  async findAll(): Promise<Answer[]> {
    return this.answerModel.find().exec();
  }

  // Find an answer by ID
  async findOne(id: string): Promise<Answer> {
    return this.answerModel.findById(id).exec();
  }

  // Update an answer by ID
  async update(id: string, updateAnswerDto: CreateAnswerDto): Promise<Answer> {
    return this.answerModel
      .findByIdAndUpdate(id, updateAnswerDto, { new: true })
      .exec();
  }

  // Delete an answer by ID
  async remove(id: string): Promise<Answer> {
    return this.answerModel.findByIdAndDelete(id).exec();
  }
}
