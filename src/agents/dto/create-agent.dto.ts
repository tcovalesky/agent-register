import { Type } from 'class-transformer';
import {
  IsDefined,
  IsNotEmptyObject,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { MediasDto } from './agent-medias.dto';

export class CreateAgentDto {
  @IsString()
  name: string;

  @IsString()
  login: string;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => MediasDto)
  medias: MediasDto;

  @IsString()
  password: string;
}
