import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { QuestionModule } from './question/question.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://brenden:Brenden1001@siriusly.tlqx8.mongodb.net/',
    ),
    AuthModule,
    QuestionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
