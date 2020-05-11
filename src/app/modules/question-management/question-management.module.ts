import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionsComponent } from './questions/questions.component';
import { CategoriesComponent } from './categories/categories.component';
import { RouterModule } from '@angular/router';
import { QuestionManagementRoutes } from './question-management.routing';
import { MaterialModule } from 'src/app/material.module';



@NgModule({
  declarations: [QuestionsComponent, CategoriesComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(QuestionManagementRoutes)
  ]
})
export class QuestionManagementModule { }
