import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Category } from 'src/app/models/category';
@Component({
  selector: 'categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {
  @Input("categories") categories: Category[];

  @Output("categoryDeleted") categoryDeleted = new EventEmitter();
  @Output("categoryViewed") categoryViewed = new EventEmitter();
  @Output("categoryEdited") categoryEdited = new EventEmitter();

  showCategoriesLoader = true;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    console.log("Categories List Changes", changes.categories.currentValue);
    if (changes.categories && changes.categories.currentValue != null) {
      this.showCategoriesLoader = false;
    }
  }

  ngOnInit() {}

  deleteCategoryClicked($event: any, categoryID: string) {
    console.log("Delete category", categoryID);
    this.categoryDeleted.emit({ categoryID });
    $event.stopPropagation();
  }

  viewCategoryClicked(category: Category) {
    console.log("View category", category);
    this.categoryViewed.emit({ category });
  }

  editCategoryClicked(category: Category) {
    this.categoryEdited.emit({ category })
  }
}
