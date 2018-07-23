import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MatDialog, MatDialogRef, MatDialogConfig } from '../../../../node_modules/@angular/material';
import { TutorialDialogComponent } from './tutorial-dialog/tutorial-dialog.component';

export interface Stage {
  title: string;
  content: string;
  route?: any;
}

@Component({
  selector: 'tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss']
})
export class TutorialComponent implements OnInit {
  @Input() public stage: number;
  @Output() progressTutorial = new EventEmitter();

  private tutorialDialog: MatDialogRef<TutorialDialogComponent>;
  private stages: MatDialogConfig<Stage>[] = [{
    data: {
      title: 'Welcome',
      content: `
<p>
  Glad to see you in the alpha.
</p>
<p>
  Current version is an early base functionality test with a lot of missing gameplay and features.<br/>
  Current design, game theme are placeholders and will most likely be changed going into beta.<br/>
  A detailed feature roadmap can be found in the home page.
<p>
<p>
  This simple walkthrough goes through the basics and goals.
</p>
  If you encounter any problems you can report them through the bug button located bottom right.<br/>
  Any feedback is very appreciated.
</p>`,
      route: null,
    },
    disableClose: true,
  }, {
    data: {
      title: 'Game overview',
      content: `
<p>
  The general goal of the game is to conquer the world.<br/>
  This is achieved by befriending players, forming an alliance and then conquering others.<br/>
  If one alliance becomes overwhelmingly dominant it's considered victorious.
</p>
<p>
  To grow your emmpire you need to upgrade your initial town.<br/>
  Once upgraded enough you'll be able to build the <b>Academy</b>.<br/>
  Once its built you'll be able to train units used for conquering towns - <b>Diplomats</b>.<br/>
<p>
  Sending <b>Diplomat</b> units with your attacks reduces a towns loyalty.<br/>
  The more <b>Diplomats</b> are in an attack the more loyalty they reduce.<br/>
  When a towns loyalty falls below 0 it's conquered and given to the conquering player<br/>
  Town loyalty regenerates over time. If a player loses all his towns he must restart.
</p>`,
    },
    disableClose: true,
  }, {
    data: {
      title: 'Header',
      content: `
<p>
  Header is the primary way to navigate the game.<br/>
  Recruitment tab becomes available only after building the <b>Barracks</b><br/>
  Some tabs open a different page while others use a sidenav.<br/>
  Some tabs open a different page while others use a sidenav.<br/>
</p>
<p>
  <b>Town</b> - overview and upgrade town<br/>
  <b>Alliance</b> - overview and manage alliance, your invitations<br/>
  <b>Map</b> - interact with other towns, send troops<br/>
  <b>Recruit</b> - (available once barracksa are built) build more troops for your town<br/>
  <b>Movements</b> - check incoming and ongoing troop movements<br/>
  <b>Support</b> - overview and manage sent and stationed support<br/>
  <b>Reports</b> - view combat reports<br/>
  <b>Rankings</b> - check world rankings<br/>
</p>`,
    },
    disableClose: true,
    backdropClass: 'backdrop-transparent',
  }, {
    data: {
      title: 'Town view',
      content: `
<p>
  The town screen is used for a quick overview and building construction.<br/>
  Main area shows building costs, build times and whether you can build them.
</p>
<p>
  On the right you can see the towns available population and resources.<br/>
  Each unit costs 1 population, population is increased by upgrading the farm.<br/>
  Resources are used both for building construction and unit recruitment.
</p>
<p>
  Below that town units, building queues and supporting units are displayed if there are any.<br/>
  Units display is formatted - 5/12 (+3)<br/>
  5 - amount of units currently stationed in town</br>
  12 - total amount of available units</br>
  (+3) - amount of units in recruitment
</p>`,
    },
    disableClose: true,
    backdropClass: 'backdrop-transparent',
  }];

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.nextStage();
  }

  nextStage() {
    this.stage = this.stage || 0;
    if (this.stage >= this.stages.length) { return; }

    this.tutorialDialog = this.dialog.open(TutorialDialogComponent, this.stages[this.stage]);
    this.tutorialDialog.beforeClose().subscribe(() => {
      this.stage++;
      this.progressTutorial.next();
      this.nextStage();
    });
  }

}
