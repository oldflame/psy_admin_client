import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionsComponent } from './questions/questions.component';
import { CategoriesComponent } from './categories/categories.component';
import { RouterModule } from '@angular/router';
import { QuestionManagementRoutes } from './question-management.routing';
import { MaterialModule } from 'src/app/material.module';
import { DialogsModule } from '../general/dialogs/dialogs.module';
import { ListsModule } from '../general/lists/lists.module';



@NgModule({
  declarations: [QuestionsComponent, CategoriesComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(QuestionManagementRoutes),
    DialogsModule,
    ListsModule
  ]
})
export class QuestionManagementModule { }
