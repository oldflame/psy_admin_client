import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationsComponent } from './locations.component';
import { RouterModule } from '@angular/router';
import { LocationsRoutes } from './locations.routing';
import { MaterialModule } from '../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListsModule } from '../general/lists/lists.module';



@NgModule({
  declarations: [LocationsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(LocationsRoutes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ListsModule
  ]
})
export class LocationsModule { }
