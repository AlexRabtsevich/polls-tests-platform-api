import { Module } from '@nestjs/common';
import { PollsService } from './polls.service';
import { PollsController } from './polls.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Poll, PollSchema } from './schemas/poll.schema';
import { FilterQueryService } from './filter-query.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Poll.name, schema: PollSchema }])],
  providers: [PollsService, FilterQueryService],
  controllers: [PollsController],
  exports: [PollsService, FilterQueryService],
})
export class PollsModule {}
