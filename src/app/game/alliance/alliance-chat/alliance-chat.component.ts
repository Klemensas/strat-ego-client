import { Component, OnChanges, Input, Output, EventEmitter, SimpleChanges, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import * as seedrandom from 'seedrandom';
import { Player, Profile, AllianceMessage } from 'strat-ego-common';

import { ALLIANCE_PERMISSIONS, PERMISSION_NAMES, Alliance, AllianceMessage, Profile, AllianceMember } from '../../../store/alliance/alliance.model';
import { ChatActions, ChatActionTypes, PostMessage, AddMessage } from '../../../store/chat/chat.actions';
import { OnInit } from '@angular/core';
import { ActionWithPayload } from '../../../store/util';
import { GameModuleState, getChatState } from '../../../store';

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

  constructor(private store: Store<GameModuleState>, private actions$: Actions) {}

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
        }
        this.inProgress = chatState.inProgress;
      });

    this.actions$.pipe(
      ofType<AddMessage>(ChatActionTypes.AddMessage),
      map((action) => action.payload)
    )
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
        this.scrollChat(this.chatScrollPosition);
      });
  }

  private sendMessage(event: KeyboardEvent, payload: string) {
    event.preventDefault();
    if (payload.length < 1) { return; }

    this.chatScrollPosition = this.getScrollPosition();
    this.message = '';
    this.store.dispatch(new PostMessage(payload));

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
    this.scrollChat(this.chatScrollPosition);
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
    setTimeout(() => {
      const element = this.messageContainer.nativeElement;

      if (!force && prevPosition > 60) { return; }
      element.scrollTop = element.scrollHeight;
    })
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
