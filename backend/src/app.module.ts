import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_AUTH } from './database/credentials';
import { Message, MessageSchema } from './messages/schemas/messages.schema';
import { MessagesController } from './messages/messages.controller';
import { MessagesService } from './messages/messages.service';
import { FilterResponseService } from './utils/filter-response.service';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://${DATABASE_AUTH.USERNAME}:${DATABASE_AUTH.PASSWORD}@cluster0.myoqo.mongodb.net/?retryWrites=true&w=majority`,
    ),
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
  ],
  controllers: [MessagesController],
  providers: [MessagesService, FilterResponseService],
})
export class AppModule {}
