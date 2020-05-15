import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActionConfirmDialogComponent } from "./action-confirm-dialog/action-confirm-dialog.component";
import { MaterialModule } from "../../../material.module";
import { AddQuestionCategoryComponent } from "./add-question-category/add-question-category.component";
import { AddQuestionComponent } from "./add-question/add-question.component";
import { AddImageCategoryComponent } from "./add-image-category/add-image-category.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AddLocationComponent } from './add-location/add-location.component';

@NgModule({
  declarations: [
    ActionConfirmDialogComponent,
    AddQuestionCategoryComponent,
    AddQuestionComponent,
    AddImageCategoryComponent,
    AddLocationComponent,
  ],
    imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  exports: [
    ActionConfirmDialogComponent,
    AddQuestionCategoryComponent,
    AddQuestionComponent,
    AddImageCategoryComponent,
  ],
  entryComponents: [
    ActionConfirmDialogComponent,
    AddQuestionCategoryComponent,
    AddQuestionComponent,
    AddImageCategoryComponent
  ],
})
export class DialogsModule {}
