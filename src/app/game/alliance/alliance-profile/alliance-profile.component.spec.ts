import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllianceProfileComponent } from './alliance-profile.component';

describe('AllianceProfileComponent', () => {
  let component: AllianceProfileComponent;
  let fixture: ComponentFixture<AllianceProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllianceProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllianceProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
