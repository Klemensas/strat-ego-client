import { Component, OnInit, OnDestroy, animate, trigger, state, style, transition } from '@angular/core';

import { PlayerService, TownService, SocketService } from '../services';

@Component({
  selector: 'game-container',
  templateUrl: './game-container.component.html',
  styleUrls: ['./game-container.component.scss'],
  animations: [
    trigger('popupState', [
      state('active', style({
        visibility: 'visible',
        opacity: 1,
        transform: 'translateX(0)',
      })),
      state('rightInactive', style({
        visibility: 'hidden',
        opacity: 0.8,
        transform: 'translateX(100%)',
      })),
      state('leftInactive', style({
        visibility: 'hidden',
        opacity: 0.8,
        transform: 'translateX(-100%)',
      })),
      transition('leftInactive => active', animate('300ms ease-out')),
      transition('rightInactive => active', animate('300ms ease-out')),
      transition('active => leftInactive', animate('300ms ease-in')),
      transition('active => rightInactive', animate('300ms ease-in'))
    ])
  ]
})
export class GameContainerComponent implements OnInit, OnDestroy {
  private canRecruit = false;
  private popupActive = {
    left: 'leftInactive',
    right: 'rightInactive'
  };

  constructor(private socket: SocketService, private playerService: PlayerService, private townService: TownService) {
  }

  ngOnInit() {
    // Initialize sockets
    this.playerService.observePlayer();
    this.townService.observeTown().subscribe(town => {
      if (town) {
        this.canRecruit = !!town.buildings['barracks'].level;
      }
    });
  }

  popupToggle(active, target) {
    this.popupActive[target] = active;
  }

  ngOnDestroy() {
    this.socket.disconnect();
  }
}
