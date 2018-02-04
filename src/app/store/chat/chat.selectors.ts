import { createSelector } from 'reselect';

import { StoreState } from '../';

export const getChatState = (state: StoreState) => state.chat;
export const getChatMessages = (state: StoreState) => state.chat.messages;
