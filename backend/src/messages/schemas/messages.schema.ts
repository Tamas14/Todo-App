import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Status } from '../enums/status.enum';

export type MessageDocument = Message & Document;

@Schema({ timestamps: true })
export class Message {
  @Prop()
  message: string;

  @Prop()
  status: Status;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
