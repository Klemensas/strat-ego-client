import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllianceInvitationsComponent } from './alliance-invitations.component';

describe('AllianceInvitationsComponent', () => {
  let component: AllianceInvitationsComponent;
  let fixture: ComponentFixture<AllianceInvitationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllianceInvitationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllianceInvitationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
