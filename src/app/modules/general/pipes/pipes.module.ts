import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterCategoriesPipe } from './filter-categories.pipe';



@NgModule({
  declarations: [FilterCategoriesPipe],
  imports: [
    CommonModule
  ],
  exports: [FilterCategoriesPipe]
})
export class PipesModule { }
