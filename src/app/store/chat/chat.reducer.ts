import { ActionReducer } from '@ngrx/store';

import { ActionWithPayload } from '../util';
import { ChatState, initialChatState } from './chat.state';
import { ChatActions } from './chat.actions';
import { AllianceActions } from '../alliance/alliance.actions';

export const ChatReducer: ActionReducer<ChatState> = (state = initialChatState, action: ActionWithPayload) => {
  switch (action.type) {
    case AllianceActions.LEAVE_ALLIANCE_SUCCESS:
    case AllianceActions.DESTROY_SUCCESS: {
      return initialChatState;
    }

    case ChatActions.UPDATE: {
      return { ...state, messages: action.payload };
    }

    case ChatActions.ADD_MESSAGE: {
      return { ...state, messages: [...state.messages, action.payload] };
    }

    case ChatActions.POST_MESSAGE: {
      return { ...state, inProgress: true };
    }

    case ChatActions.POST_MESSAGE_SUCCESS: {
      return { ...state, inProgress: false, messages: [...state.messages, action.payload] };
    }

    // case ChatActions.UPDATE_MEMBER: {
    //   const Chat = state.Chats[state.playerChat];
    //   const memberIndex = Chat.Members.findIndex(({ id }) => id === action.payload.id);

    //   Chat.Members[memberIndex] = action.payload;
    //   return {
    //     ...state,
    //     Chats: {
    //       ...state.Chats,
    //       Chat
    //     }
    //   };
    // }

    // case ChatActions.REMOVED_MEMBER: {
    //   const Chat = action.payload.Chat;
    //   return {
    //     ...state,
    //     Chats: {
    //       ...state.Chats,
    //       [state.playerChat]: Chat
    //     }
    //   };
    // }

    // case ChatActions.LEAVE_Chat_SUCCESS: {
    //   return {
    //     ...state,
    //     playerChat: null,
    //     role: null,
    //   };
    // }

    // case ChatActions.DESTROY_SUCCESS: {
    //   const Chats = { ...state.Chats, [state.playerChat]: null };
    //   return {
    //     ...state,
    //     ...Chats,
    //     role: null,
    //     playerChat: null,
    //   };
    // }

    // case ChatActions.CREATE_FORUM_CATEGORY_SUCCESS: {
    //   const Forum = [ ...state.Chats[state.playerChat].Forum, action.payload];
    //   const Chat = { ...state.Chats[state.playerChat], Forum };
    //   return {
    //     ...state,
    //     Chats: {
    //       ...state.Chats,
    //       [state.playerChat]: Chat
    //     },
    //   };
    // }

    default: {
      return state;
    }
  }
};
