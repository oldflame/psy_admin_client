import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationListComponent } from './location-list/location-list.component';
import { MaterialModule } from '../../../material.module';
import { CategoriesListComponent } from './categories-list/categories-list.component';



@NgModule({
  declarations: [LocationListComponent, CategoriesListComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [LocationListComponent]
})
export class ListsModule { }
