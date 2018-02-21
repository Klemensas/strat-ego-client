import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllianceOverviewComponent } from './alliance-overview.component';

describe('AllianceOverviewComponent', () => {
  let component: AllianceOverviewComponent;
  let fixture: ComponentFixture<AllianceOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllianceOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllianceOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
