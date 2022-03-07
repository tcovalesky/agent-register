import { AgentDocument } from '../schemas/agent.schema';

export class AgentSerializer {
  static json(agent: Partial<AgentDocument>) {
    return {
      name: agent.name,
      login: agent.login,
      id: agent._id,
      medias: {
        chat: {
          handleMode: agent.medias.chat.handleMode,
          selected: agent.medias.chat.selected,
          max: agent.medias.chat.max,
          min: agent.medias.chat.min,
        },
        email: {
          selected: agent.medias.email.selected,
          max: agent.medias.email.max,
          min: agent.medias.email.min,
        },
        voice: {
          devicePassword: agent.medias.voice.devicePassword,
          device: agent.medias.voice.device,
          handleMode: agent.medias.voice.handleMode,
          selected: agent.medias.voice.selected,
          max: agent.medias.voice.max,
          min: agent.medias.voice.min,
        },
      },
    };
  }
}
