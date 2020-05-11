import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionConfirmDialogComponent } from './action-confirm-dialog/action-confirm-dialog.component';
import { MaterialModule } from '../../../material.module';
import { AddQuestionCategoryComponent } from './add-question-category/add-question-category.component';
import { AddQuestionComponent } from './add-question/add-question.component';



@NgModule({
  declarations: [ActionConfirmDialogComponent, AddQuestionCategoryComponent, AddQuestionComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [ActionConfirmDialogComponent, AddQuestionCategoryComponent, AddQuestionComponent],
  entryComponents: [ActionConfirmDialogComponent, AddQuestionCategoryComponent, AddQuestionComponent]
})
export class DialogsModule { }
