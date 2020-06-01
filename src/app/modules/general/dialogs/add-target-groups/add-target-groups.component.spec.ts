import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTargetGroupsComponent } from './add-target-groups.component';

describe('AddTargetGroupsComponent', () => {
  let component: AddTargetGroupsComponent;
  let fixture: ComponentFixture<AddTargetGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTargetGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTargetGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
