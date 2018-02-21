import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllianceDiplomacyComponent } from './alliance-diplomacy.component';

describe('AllianceDiplomacyComponent', () => {
  let component: AllianceDiplomacyComponent;
  let fixture: ComponentFixture<AllianceDiplomacyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllianceDiplomacyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllianceDiplomacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
