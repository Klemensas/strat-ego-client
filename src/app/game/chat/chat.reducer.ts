import { AllianceMessage } from 'strat-ego-common';

import { ChatActions, ChatActionTypes } from './chat.actions';
import { AllianceActions, AllianceActionTypes } from '../alliance/alliance.actions';

export interface ChatState {
  messages: AllianceMessage[];
}

export const initialState: ChatState = {
  messages: [],
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
      return { ...state };
    }

    case ChatActionTypes.PostMessageSuccess: {
      return { ...state, messages: [...state.messages, action.payload] };
    }
    default: {
      return state;
    }
  }
}

export const getChatMessages = (state: ChatState) => state.messages;
