import { Injectable } from '@nestjs/common';
import { Message, MessageDocument } from './schemas/messages.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateWriteOpResult } from 'mongoose';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessagesService {
  constructor(@InjectModel(Message.name) private messageModel: Model<MessageDocument>) {
  }

  checkIdLength(id) {
    return id.length === 24;
  }

  async createMessage(createMessageDto: CreateMessageDto): Promise<Message> {
    const createdMessage = new this.messageModel(createMessageDto);
    return createdMessage.save();
  }

  async getMessages(): Promise<Message[]> {
    return this.messageModel.find().exec();
  }

  async updateMessage(
    id,
    updateMessageDto: UpdateMessageDto,
  ): Promise<UpdateWriteOpResult> {
    return this.messageModel.updateOne({ _id: id }, updateMessageDto);
  }

  async deleteMessage(id: string): Promise<any> {
    return this.messageModel.deleteOne({ _id: id });
  }
}
