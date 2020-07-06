import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersManagementComponent } from './users-management.component';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule } from '@angular/router';
import { UsersManagementRoutes } from './users-management.routing';
import { ListsModule } from '../general/lists/lists.module';
import { TrendsComponent } from './trends/trends.component';
import { WidgetsModule } from '../general/widgets/widgets.module';
import { DetailsComponent } from './details/details.component';



@NgModule({
  declarations: [UsersManagementComponent, TrendsComponent, DetailsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(UsersManagementRoutes),
    ListsModule,
    WidgetsModule
  ]
})
export class UsersManagementModule { }
