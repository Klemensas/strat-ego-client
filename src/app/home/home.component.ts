import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { GameDataService } from '../services/game-data.service';
import { Observable } from 'rxjs/Observable';

@Component({
  moduleId: module.id,
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  // providers: [GameDataService]
})
export class HomeComponent implements OnInit {
  private worlds;
  private user;
  constructor(private authService:AuthService, private gdService:GameDataService) {}

  ngOnInit() {
    this.gdService.worldData
      .subscribe(worlds => {
        this.worlds = worlds;
      });
    this.authService.user.subscribe(
      u => {
        this.user = u;
      }
    );
  }

}
