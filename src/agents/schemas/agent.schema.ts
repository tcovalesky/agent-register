import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type AgentDocument = Agent & Document;

@Schema()
export class VoiceMedias extends Document {
  @Prop({ required: true })
  min: number;

  @Prop({ required: true })
  max: number;

  @Prop({ required: true })
  selected: number;

  @Prop({ required: false })
  handleMode: string;

  @Prop({ required: false })
  device: string;

  @Prop({ required: false })
  devicePassword: string;
}
export const VoiceMediasSchema = SchemaFactory.createForClass(VoiceMedias);

@Schema()
export class EmailMedias {
  @Prop({ required: true })
  min: number;

  @Prop({ required: true })
  max: number;

  @Prop({ required: true })
  selected: number;
}
export const EmailMediasSchema = SchemaFactory.createForClass(EmailMedias);

@Schema()
export class ChatMedias {
  @Prop({ required: true })
  min: number;

  @Prop({ required: true })
  max: number;

  @Prop({ required: true })
  selected: number;

  @Prop({ required: false })
  handleMode: string;
}
export const ChatMediasSchema = SchemaFactory.createForClass(ChatMedias);

@Schema()
export class AgentMedias {
  @Prop({ type: VoiceMediasSchema, required: true })
  voice: VoiceMedias;

  @Prop({ type: EmailMediasSchema, required: true })
  email: EmailMedias;

  @Prop({ type: ChatMediasSchema, required: true })
  chat: ChatMedias;
}
export const AgentMediasSchema = SchemaFactory.createForClass(AgentMedias);

@Schema()
export class Agent {
  @Prop({ default: uuidv4 })
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  login: string;

  @Prop({ type: AgentMediasSchema, required: true })
  medias: AgentMedias;

  @Prop({ required: true })
  password: string;
}
export const AgentSchema = SchemaFactory.createForClass(Agent);
