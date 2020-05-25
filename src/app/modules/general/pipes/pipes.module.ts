import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterCategoriesPipe } from './filter-categories.pipe';
import { FilterImagesPipe } from './filter-images.pipe';
import { FilterLocationsPipe } from './filter-locations.pipe';
import { FilterTargetGroupsPipe } from './filter-target-groups.pipe';



@NgModule({
  declarations: [FilterCategoriesPipe, FilterImagesPipe, FilterLocationsPipe, FilterTargetGroupsPipe],
  imports: [
    CommonModule
  ],
  exports: [FilterCategoriesPipe, FilterImagesPipe, FilterLocationsPipe, FilterTargetGroupsPipe]
})
export class PipesModule { }
