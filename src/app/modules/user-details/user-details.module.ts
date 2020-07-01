import { PipesModule } from './../general/pipes/pipes.module';
import { WidgetsModule } from './../general/widgets/widgets.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailsComponent } from './user-details.component';
import { UserDetailsRoutes } from './user-details.routing';
import { RouterModule } from '@angular/router';
import { ListsModule } from '../general/lists/lists.module';

@NgModule({
  declarations: [UserDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(UserDetailsRoutes),
    WidgetsModule,
    ListsModule,
    PipesModule
  ]
})
export class UserDetailsModule { }
