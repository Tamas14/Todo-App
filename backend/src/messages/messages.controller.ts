import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { ApiTags } from '@nestjs/swagger';
import { Status } from './enums/status.enum';
import { MessagesService } from './messages.service';
import { UpdateMessageDto } from './dto/update-message.dto';
import { FilterResponseService } from '../utils/filter-response.service';
import { CreateMessageResponseDto } from './dto/create-message-response.dto';

@ApiTags('messages')
@Controller('messages')
export class MessagesController {
  constructor(
    private messagesService: MessagesService,
    private filterResponseService: FilterResponseService,
  ) {}

  @Post()
  @HttpCode(201)
  async createMessage(@Body() createMessageDto: CreateMessageDto) {
    createMessageDto.status = Status.Created;
    const result = await this.messagesService.createMessage(createMessageDto);

    return this.filterResponseService.filterResponse(
      result,
      CreateMessageResponseDto,
    );
  }

  @Get()
  async getMessages() {
    const messages = await this.messagesService.getMessages();
    return messages;
  }

  @Patch(':id')
  async updateMessage(@Param('id') id: string, @Body() message: UpdateMessageDto) {
    if (!this.messagesService.checkIdLength(id)) {
      throw new HttpException('Bad id', HttpStatus.BAD_REQUEST);
    }

    if (Object.keys(message).length === 0) {
      throw new HttpException('Empty request body', HttpStatus.BAD_REQUEST);
    }

    const result = await this.messagesService.updateMessage(id, message);

    if (result.matchedCount === 0) {
      throw new HttpException('Id not found', HttpStatus.BAD_REQUEST);
    }

    if (!result.acknowledged || result.modifiedCount === 0) {
      throw new HttpException(
        'Internal error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async deleteMessage(@Param('id') id: string) {
    if (!this.messagesService.checkIdLength(id)) {
      throw new HttpException('Bad id', HttpStatus.BAD_REQUEST);
    }

    const result = await this.messagesService.deleteMessage(id);

    if (!result.acknowledged) {
      throw new HttpException(
        'Internal error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (result.deletedCount === 0) {
      throw new HttpException('Bad id', HttpStatus.BAD_REQUEST);
    }
  }
}
