import { Component, OnChanges, Input, Output, EventEmitter, SimpleChanges, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as seedrandom from 'seedrandom';

import { ALLIANCE_PERMISSIONS, PERMISSION_NAMES, Alliance, AllianceMessage, Profile, AllianceMember } from '../../../store/alliance/alliance.model';
import { StoreState } from '../../../store/index';
import { AllianceActions } from '../../../store/alliance/alliance.actions';
import { ChatActions } from '../../../store/chat/chat.actions';
import { getChatState } from '../../../store/chat/chat.selectors';
import { OnInit } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { ActionWithPayload } from '../../../store/util';
import { Player } from '../../../store/player/player.model';

export interface ChatMessage {
  id: number;
  text: string;
  createdAt: number;
  saving?: boolean;
}

export interface ChatEntry {
  PlayerId: number;
  Player: Profile;
  messages: ChatMessage[];
  color: string;
  saving?: boolean;
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

  private inProgress = false;
  // TODO: current architecture only supports singular message query, consider refactoring to supports multi messages in progress
  // a possible option for that would be to send an extra randomized id which would get returned on success
  private progressingMessage: ChatMessage;
  private chatScrollPosition: number = null;

  constructor(private store: Store<StoreState>, private actions$: Actions) {}

  ngOnInit() {
    this.store.select(getChatState)
      .subscribe((chatState) => {
        if (!this.entries.length) {
          this.entries = this.formatEntries(chatState.messages);
          setTimeout(() => this.scrollChat(this.chatScrollPosition));
        }

        // Set saving prop to false for message if progress complete
        if (chatState.inProgress !== this.inProgress && this.progressingMessage) {
          this.progressingMessage.saving = false;
          this.progressingMessage = null;
          console.log('this', this.entries)
        }
        this.inProgress = chatState.inProgress;
      });

    this.actions$
      .ofType(ChatActions.ADD_MESSAGE)
      .map((action: ActionWithPayload) => action.payload)
      .subscribe((message: AllianceMessage) => {
        this.chatScrollPosition = this.getScrollPosition();
        const lastEntry = this.entries[this.entries.length - 1];
        if (lastEntry && lastEntry.PlayerId === message.PlayerId) {
          lastEntry.messages.push({
            id: message.id,
            text: message.text,
            createdAt: message.createdAt
          });
        } else {
          this.entries.push(this.formatEntry(message.PlayerId, message.Player, {
            id: message.id,
            text: message.text,
            createdAt: message.createdAt
          }));
        }
        setTimeout(() => this.scrollChat(this.chatScrollPosition));
      });
  }

  private sendMessage(event: KeyboardEvent, payload: string) {
    event.preventDefault();
    if (payload.length < 1) { return; }

    this.chatScrollPosition = this.getScrollPosition();
    this.message = '';
    this.store.dispatch({ type: ChatActions.POST_MESSAGE, payload });

    const lastEntry = this.entries[this.entries.length - 1];
    const message = {
      id: null,
      text: payload,
      createdAt: Date.now(),
      saving: true,
    };

    if (lastEntry && lastEntry.PlayerId === this.player.id) {
      lastEntry.messages.push(message);
    } else {
      this.entries.push(this.formatEntry(this.player.id, { name: this.player.name }, message));
    }
    this.progressingMessage = message;
    setTimeout(() => this.scrollChat(this.chatScrollPosition));
  }

  private formatEntries(messages: AllianceMessage[]): ChatEntry[] {
    return messages.reduce((result, current, i, arr) => {
      const prev = arr[i - 1];

      if (prev && prev.PlayerId === current.PlayerId) {
        result[result.length - 1].messages.push({
          id: current.id,
          text: current.text,
          createdAt: current.createdAt
        });
        return result;
      }
      result.push(this.formatEntry(current.PlayerId, current.Player, {
        id: current.id,
        text: current.text,
        createdAt: current.createdAt
      }));
      return result;
    }, []);
  }

  private formatEntry(PlayerId: number, profile: Profile, entry: ChatMessage): ChatEntry {
    return {
      PlayerId,
      Player: { name: profile.name },
      messages: [{
        id: entry.id,
        text: entry.text,
        saving: entry.saving,
        createdAt: entry.createdAt
      }],
      color: this.getPlayerColor(profile.name, PlayerId),
    };
  }

  private getScrollPosition(): number {
    return this.messageContainer.nativeElement.scrollHeight -
      this.messageContainer.nativeElement.scrollTop -
      this.messageContainer.nativeElement.clientHeight;
  }

  private scrollChat(prevPosition: number, force = false) {
    const element = this.messageContainer.nativeElement;

    if (!force && prevPosition > 60) { return; }
    element.scrollTop = element.scrollHeight;
  }

  private getPlayerColor(name: string, id: number) {
    if (!this.playerColors[name]) {
      this.playerColors[name] = this.randomHsl(name, id);
    }
    return this.playerColors[name];
  }

  private randomHsl(name, id) {
    // TODO: use actual world name here
    const number =  seedrandom.xor4096(`megapolis.${id}.${name}`).quick();
    return `hsla(${number * 360}, 80%, 50%, 0.5)`;
  }
}
