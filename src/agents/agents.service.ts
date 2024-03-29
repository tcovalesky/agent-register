import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
import { Agent, AgentDocument } from './schemas/agent.schema';
import { Model } from 'mongoose';
import { AgentSerializer } from './views/user.serializer';

@Injectable()
export class AgentsService {
  constructor(
    @InjectModel(Agent.name) private agentModel: Model<AgentDocument>,
  ) {}

  async create(createAgentDto: CreateAgentDto) {
    if (await this.agentModel.findOne({ login: createAgentDto.login }).exec()) {
      throw new UnprocessableEntityException('Login already registered');
    }

    const agent = await this.agentModel.create(createAgentDto);

    return AgentSerializer.json(agent);
  }

  async findAll() {
    const agents = await this.agentModel.find().exec();
    return AgentSerializer.withArray(agents);
  }

  async findOne(id: string) {
    const agent = await this.agentModel
      .findOne({ _id: id, deleted_at: undefined })
      .exec();
    return AgentSerializer.json(agent);
  }

  async update(id: string, updateAgentDto: UpdateAgentDto) {
    await this.agentModel.updateOne(
      { _id: id, deleted_at: undefined },
      updateAgentDto,
    );
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.agentModel.deleteOne({ _id: id }).exec();
    return;
  }
}
