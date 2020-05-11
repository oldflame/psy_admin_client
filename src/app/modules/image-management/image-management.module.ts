import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories/categories.component';
import { ImagesComponent } from './images/images.component';
import { RouterModule } from '@angular/router';
import { ImageManagementRoutes } from './image-management.routing';
import { MaterialModule } from '../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListsModule } from '../general/lists/lists.module';
import { DialogsModule } from '../general/dialogs/dialogs.module';



@NgModule({
  declarations: [CategoriesComponent, ImagesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ImageManagementRoutes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ListsModule,
    DialogsModule
  ]
})
export class ImageManagementModule { }
