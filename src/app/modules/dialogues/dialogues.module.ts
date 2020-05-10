import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddQuestionComponent } from './add-question/add-question.component';
import { AddQuestionCategoryComponent } from './add-question-category/add-question-category.component';



@NgModule({
  declarations: [AddQuestionComponent, AddQuestionCategoryComponent],
  imports: [
    CommonModule
  ]
})
export class DialoguesModule { }
