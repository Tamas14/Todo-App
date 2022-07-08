import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Status } from '../enums/status.enum';

export class CreateMessageDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  message: string;

  status: Status;
};
