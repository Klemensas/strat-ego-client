import { createSelector } from '@ngrx/store';

export const getChatState = (state: any) => state.game.chat;
export const getChatMessages = (state: any) => state.game.chat.messages;
