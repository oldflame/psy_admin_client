import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersManagementComponent } from './users-management.component';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule } from '@angular/router';
import { UsersManagementRoutes } from './users-management.routing';
import { ListsModule } from '../general/lists/lists.module';



@NgModule({
  declarations: [UsersManagementComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(UsersManagementRoutes),
    ListsModule
  ]
})
export class UsersManagementModule { }
