import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectQuestionDialogComponent } from './select-question-dialog.component';

describe('SelectQuestionDialogComponent', () => {
  let component: SelectQuestionDialogComponent;
  let fixture: ComponentFixture<SelectQuestionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectQuestionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectQuestionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
