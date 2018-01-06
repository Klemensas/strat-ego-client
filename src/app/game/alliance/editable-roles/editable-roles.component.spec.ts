import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableRolesComponent } from './editable-roles.component';

describe('EditableRolesComponent', () => {
  let component: EditableRolesComponent;
  let fixture: ComponentFixture<EditableRolesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditableRolesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
