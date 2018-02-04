import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllianceChatComponent } from './alliance-chat.component';

describe('AllianceChatComponent', () => {
  let component: AllianceChatComponent;
  let fixture: ComponentFixture<AllianceChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllianceChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllianceChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
