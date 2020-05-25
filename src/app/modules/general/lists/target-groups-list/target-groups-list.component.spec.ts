import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetGroupsListComponent } from './target-groups-list.component';

describe('TargetGroupsListComponent', () => {
  let component: TargetGroupsListComponent;
  let fixture: ComponentFixture<TargetGroupsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetGroupsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetGroupsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
