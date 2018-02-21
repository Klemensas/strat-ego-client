import { ChatActions, ChatActionTypes } from './chat.actions';
import { AllianceActions, AllianceActionTypes } from '../alliance/alliance.actions';

import { AllianceMessage } from '../alliance/alliance.model';

export interface ChatState {
  messages: AllianceMessage[];
  inProgress: boolean;
}

export const initialState: ChatState = {
  messages: [],
  inProgress: false,
};


export function reducer(
  state = initialState,
  action: ChatActions | AllianceActions
) {
  switch (action.type) {
    case AllianceActionTypes.LeaveAllianceSuccess:
    case AllianceActionTypes.DestroySuccess: {
      return initialState;
    }

    case ChatActionTypes.Update: {
      return { ...state, messages: action.payload };
    }

    case ChatActionTypes.AddMessage: {
      return { ...state, messages: [...state.messages, action.payload] };
    }

    case ChatActionTypes.PostMessage: {
      return { ...state, inProgress: true };
    }

    case ChatActionTypes.PostMessageSuccess: {
      return { ...state, inProgress: false, messages: [...state.messages, action.payload] };
    }
    default: {
      return state;
    }
  }
};

export const getChatMessages = (state: ChatState) => state.messages;
