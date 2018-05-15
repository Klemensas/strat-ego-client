import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TownHoverComponent } from './town-hover.component';

describe('TownHoverComponent', () => {
  let component: TownHoverComponent;
  let fixture: ComponentFixture<TownHoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TownHoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TownHoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
