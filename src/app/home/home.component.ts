import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { GameDataService } from '../services/game-data.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
})
export class HomeComponent implements OnInit {
  private worlds;
  private user;
  private userSubScription: Subscription;

  constructor(private authService:AuthService, private gdService:GameDataService) {
    this.userSubScription = this.authService.user.subscribe(
      user => {
        this.user = user;
      }
    );
    this.gdService.data.world
      .subscribe(worlds => {
        this.worlds = worlds;
      });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  userOnWorld(world) {
      return this.user.UserWorlds.find(w => w._id === world._id);
  }

}
