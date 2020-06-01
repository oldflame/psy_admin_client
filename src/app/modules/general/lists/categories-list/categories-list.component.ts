import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { Category } from 'src/app/models/category';
import { QuestionCategory } from 'src/app/models/question-category';
@Component({
  selector: 'categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit, OnChanges {
  @Input("categories") categories: Category[] | QuestionCategory[];

  @Output("categoryDeleted") categoryDeleted = new EventEmitter();
  @Output("categoryRestored") categoryRestored = new EventEmitter();
  @Output("categoryViewed") categoryViewed = new EventEmitter();
  @Output("categoryEdited") categoryEdited = new EventEmitter();

  showCategoriesLoader = true;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.categories && changes.categories.currentValue != null) {
      this.showCategoriesLoader = false;
    }
  }

  ngOnInit() {}

  deleteCategoryClicked($event: any, categoryID: string) {
    this.categoryDeleted.emit({ categoryID });
    $event.stopPropagation();
  }

  restoreCategoryClicked($event: any, categoryID: string) {
    this.categoryRestored.emit({ categoryID });
    $event.stopPropagation();
  }

  viewCategoryClicked(eventArgs: any, category: Category) {
    this.categoryViewed.emit({ category });
  }

  editCategoryClicked(category: Category) {
    this.categoryEdited.emit({ category })
  }
}
