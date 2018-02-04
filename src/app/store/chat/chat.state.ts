import { AllianceMessage } from '../alliance/alliance.model';

export interface ChatState {
  messages: AllianceMessage[];
  inProgress: boolean;
}

export const initialChatState: ChatState = {
  messages: [],
  inProgress: false,
};
