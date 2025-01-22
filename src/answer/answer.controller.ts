import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { Answer } from './schema/answer.schema';

@Controller('answers')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post()
  async create(@Body() createAnswerDto: CreateAnswerDto): Promise<Answer> {
    return this.answerService.create(createAnswerDto);
  }

  @Get()
  async findAll(): Promise<Answer[]> {
    return this.answerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Answer> {
    return this.answerService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAnswerDto: CreateAnswerDto,
  ): Promise<Answer> {
    return this.answerService.update(id, updateAnswerDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Answer> {
    return this.answerService.remove(id);
  }
}
