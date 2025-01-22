import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateQuestionDto } from './dto/create-question.dto';
import { Question } from './schema/question.schema';
import { Tag } from './schema/tag.schema';
@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(Question.name) private questionModel: Model<Question>,
    @InjectModel(Tag.name) private tagModel: Model<Tag>,
  ) {}

  // Create a new question
  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    const tagIds = [];
    for (const tagName of createQuestionDto.tags) {
      let tag = await this.tagModel.findOne({ name: tagName }).exec();
      if (!tag) {
        tag = new this.tagModel({ name: tagName });
        await tag.save();
      }
      tagIds.push(tag.tag_id);
    }
    const newQuestion = new this.questionModel({
      ...createQuestionDto,
      tag_ids: tagIds,
    });
    return newQuestion.save();
  }

  

  // Find all questions
  async findAll(): Promise<Question[]> {
    const questions = await this.questionModel.find().exec();
    const questionsWithTags = [];
    for (const question of questions) {
      const tags = await this.tagModel
        .find({ tag_id: { $in: question.tag_ids } })
        .exec();
      questionsWithTags.push({
        ...question.toObject(),
        tags: tags.map((tag) => tag.name),
      });
    }
    return questionsWithTags;
  }

  // Find a question by ID
  async findOne(id: string): Promise<Question> {
    return this.questionModel.findById(id).exec();
  }

  // Update a question by ID
  //   async update(id: string, updateQuestionDto: UpdateQuestionDto): Promise<Question> {
  //     return this.questionModel.findByIdAndUpdate(id, updateQuestionDto, { new: true }).exec();
  //   }

  // Delete a question by ID
  async remove(id: string): Promise<Question> {
    return this.questionModel.findByIdAndDelete(id).exec();
  }

  async recommendQuestions(userId: string): Promise<Question[]> {
    // Implement question recommendation logic here
    // This is a placeholder implementation

    return [];
  }
}
