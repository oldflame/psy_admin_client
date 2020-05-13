import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddImageCategoryComponent } from './add-image-category.component';

describe('AddImageCategoryComponent', () => {
  let component: AddImageCategoryComponent;
  let fixture: ComponentFixture<AddImageCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddImageCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddImageCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
