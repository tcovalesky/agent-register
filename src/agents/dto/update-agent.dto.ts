import { OmitType } from '@nestjs/mapped-types';
import { CreateAgentDto } from './create-agent.dto';

export class UpdateAgentDto extends OmitType(CreateAgentDto, [
  'password',
] as const) {}
