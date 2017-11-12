import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TownLoyaltyComponent } from './town-loyalty.component';

describe('TownLoyaltyComponent', () => {
  let component: TownLoyaltyComponent;
  let fixture: ComponentFixture<TownLoyaltyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TownLoyaltyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TownLoyaltyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
