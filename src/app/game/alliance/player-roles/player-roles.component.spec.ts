import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerRolesComponent } from './player-roles.component';

describe('PlayerRolesComponent', () => {
  let component: PlayerRolesComponent;
  let fixture: ComponentFixture<PlayerRolesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerRolesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
