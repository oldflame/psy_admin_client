import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material.module';
import { HighchartsComponent } from './highcharts/highcharts.component';



@NgModule({
  declarations: [SearchComponent, HighchartsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [SearchComponent, HighchartsComponent]
})
export class WidgetsModule { }
