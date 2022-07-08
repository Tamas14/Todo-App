import { Status } from '../enums/status.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateMessageDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  message?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  status?: Status;
}
