import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersModule } from '@users/users.module';
import { AuthModule } from '@auth/auth.module';
import { PollsModule } from '@polls/polls.module';
import { AnswersModule } from '@answers/answers.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongo_db'),
    UsersModule,
    AuthModule,
    PollsModule,
    AnswersModule,
    AnswersModule,
  ],
})
export class AppModule {}
