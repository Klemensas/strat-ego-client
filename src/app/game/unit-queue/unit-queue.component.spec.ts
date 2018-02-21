import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitQueueComponent } from './unit-queue.component';

describe('UnitQueueComponent', () => {
  let component: UnitQueueComponent;
  let fixture: ComponentFixture<UnitQueueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitQueueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
