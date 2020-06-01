import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GesturesTestComponent } from './gestures-test.component';

describe('GesturesTestComponent', () => {
  let component: GesturesTestComponent;
  let fixture: ComponentFixture<GesturesTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GesturesTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GesturesTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
