import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddQuestionComponent } from './add-question/add-question.component';
import { AddQuestionCategoryComponent } from './add-question-category/add-question-category.component';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule, FormControl } from '@angular/forms';



@NgModule({
  declarations: [AddQuestionComponent, AddQuestionCategoryComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormControl
  ]
})
export class DialoguesModule { }
