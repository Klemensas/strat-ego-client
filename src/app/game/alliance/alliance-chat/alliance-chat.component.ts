import { Component, OnChanges, Input, EventEmitter, SimpleChanges, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { map, first } from 'rxjs/operators';
import * as seedrandom from 'seedrandom';
import { Player, Profile, AllianceMessage, PlayerProfile } from 'strat-ego-common';

import { ChatActions, ChatActionTypes, PostMessage, AddMessage, PostMessageSuccess } from '../../chat/chat.actions';
import { OnInit } from '@angular/core';
import { GameModuleState, getChatState, getChatMessages, getFullChatMessages } from '../../reducers';

export interface ChatMessage {
  id: number;
  text: string;
  createdAt: string | number;
  messageStamp?: number;
}

export interface ChatEntry {
  playerId: number;
  player: PlayerProfile;
  messages: ChatMessage[];
  color: string;
}

@Component({
  selector: 'alliance-chat',
  templateUrl: './alliance-chat.component.html',
  styleUrls: ['./alliance-chat.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AllianceChatComponent implements OnInit {
  @ViewChild('messageContainer') messageContainer: ElementRef;
  @Input() player: Player;

  visible = false;
  entries: ChatEntry[] = [];
  message = '';
  playerColors = {};

  // Reference fresh entry messages and remove ref on save
  private progressingMessages: { [key: number]: ChatMessage } = {};
  private chatScrollPosition: number = null;

  constructor(private store: Store<GameModuleState>, private actions$: Actions) {}

  ngOnInit() {
    this.store.select(getFullChatMessages)
      .pipe(first())
      .subscribe((messages) => {
        this.entries = this.formatEntries(messages);
        this.scrollChat(this.chatScrollPosition);
      });

    this.actions$.pipe(
      ofType<PostMessageSuccess>(ChatActionTypes.PostMessageSuccess),
      map((action) => action.payload)
    )
      .subscribe(({ message, messageStamp }) => {
        const target = this.progressingMessages[messageStamp];
        target.messageStamp = null;
        target.id = message.id;
        delete this.progressingMessages[messageStamp];
      });

    this.actions$.pipe(
      ofType<AddMessage>(ChatActionTypes.AddMessage),
      map((action) => action.payload)
    )
      .subscribe((message: AllianceMessage) => {
        this.chatScrollPosition = this.getScrollPosition();
        const lastEntry = this.entries[this.entries.length - 1];
        if (lastEntry && lastEntry.playerId === message.playerId) {
          lastEntry.messages.push({
            id: message.id,
            text: message.text,
            createdAt: +message.createdAt
          });
        } else {
          this.entries.push(this.formatEntry(message.playerId, message.player, {
            id: message.id,
            text: message.text,
            createdAt: message.createdAt
          }));
        }
        this.scrollChat(this.chatScrollPosition);
      });
  }

  sendMessage(event: KeyboardEvent, text: string) {
    event.preventDefault();
    if (text.length < 1) { return; }

    this.chatScrollPosition = this.getScrollPosition();
    this.message = '';
    const messageStamp = this.generateSeededNumber(`alliance.message.${this.player.id}.${Date.now()}`);
    this.store.dispatch(new PostMessage({ text, messageStamp }));

    const lastEntry = this.entries[this.entries.length - 1];
    const message = {
      id: null,
      text,
      createdAt: String(Date.now()),
      messageStamp,
    };

    if (lastEntry && lastEntry.playerId === this.player.id) {
      lastEntry.messages.push(message);
    } else {
      this.entries.push(this.formatEntry(this.player.id, { id: this.player.id, name: this.player.name }, message));
    }
    this.progressingMessages[messageStamp] = message;
    this.scrollChat(this.chatScrollPosition);
  }

  private formatEntries(messages: AllianceMessage[]): ChatEntry[] {
    return messages.reduce((result, current, i, arr) => {
      const prev = arr[i - 1];

      if (prev && prev.playerId === current.playerId) {
        result[result.length - 1].messages.push({
          id: current.id,
          text: current.text,
          createdAt: current.createdAt
        });
        return result;
      }
      result.push(this.formatEntry(current.playerId, current.player, {
        id: current.id,
        text: current.text,
        createdAt: current.createdAt
      }));
      return result;
    }, []);
  }

  private formatEntry(playerId: number, profile: Partial<PlayerProfile>, entry: ChatMessage): ChatEntry {
    return {
      playerId,
      player: { id: playerId, name: profile.name },
      messages: [entry],
      color: this.getPlayerColor(profile.name, playerId),
    };
  }

  private getScrollPosition(): number {
    return this.messageContainer.nativeElement.scrollHeight -
      this.messageContainer.nativeElement.scrollTop -
      this.messageContainer.nativeElement.clientHeight;
  }

  private scrollChat(prevPosition: number, force = false) {
    setTimeout(() => {
      const element = this.messageContainer.nativeElement;

      if (!force && prevPosition > 60) { return; }
      element.scrollTop = element.scrollHeight;
    });
  }

  private getPlayerColor(name: string, id: number) {
    if (!this.playerColors[name]) {
      this.playerColors[name] = this.randomHsl(name, id);
    }
    return this.playerColors[name];
  }

  private randomHsl(name: string, id: number) {
    // TODO: use actual world name here
    const number = this.generateSeededNumber(`megapolis.${id}.${name}`);
    return `hsla(${number * 360}, 80%, 50%, 0.5)`;
  }

  private generateSeededNumber(seed: string) {
    return seedrandom.xor4096(seed).quick();
  }
}
