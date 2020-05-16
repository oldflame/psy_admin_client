import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterCategoriesPipe } from './filter-categories.pipe';
import { FilterImagesPipe } from './filter-images.pipe';



@NgModule({
  declarations: [FilterCategoriesPipe, FilterImagesPipe],
  imports: [
    CommonModule
  ],
  exports: [FilterCategoriesPipe, FilterImagesPipe]
})
export class PipesModule { }
