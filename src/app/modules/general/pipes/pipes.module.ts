import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterCategoriesPipe } from './filter-categories.pipe';
import { FilterImagesPipe } from './filter-images.pipe';
import { FilterLocationsPipe } from './filter-locations.pipe';



@NgModule({
  declarations: [FilterCategoriesPipe, FilterImagesPipe, FilterLocationsPipe],
  imports: [
    CommonModule
  ],
  exports: [FilterCategoriesPipe, FilterImagesPipe, FilterLocationsPipe]
})
export class PipesModule { }
