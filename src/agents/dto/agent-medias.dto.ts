import { Type } from 'class-transformer';
import {
  IsDefined,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class VoiceMediasDto {
  @IsNumber()
  min: number;

  @IsNumber()
  max: number;

  @IsNumber()
  selected: number;

  @IsString()
  @IsOptional()
  handleMode: string;

  @IsString()
  @IsOptional()
  device: string;

  @IsString()
  @IsOptional()
  devicePassword: string;
}

class EmailMediasDto {
  @IsNumber()
  min: number;

  @IsNumber()
  max: number;

  @IsNumber()
  selected: number;
}

class ChatMediasDto {
  @IsNumber()
  min: number;

  @IsNumber()
  max: number;

  @IsNumber()
  selected: number;

  @IsString()
  @IsOptional()
  handleMode: string;
}

export class MediasDto {
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => VoiceMediasDto)
  voice: VoiceMediasDto;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => EmailMediasDto)
  email: EmailMediasDto;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => ChatMediasDto)
  chat: ChatMediasDto;
}
