import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActionConfirmDialogComponent } from "./action-confirm-dialog/action-confirm-dialog.component";
import { MaterialModule } from "../../../material.module";
import { AddQuestionCategoryComponent } from "./add-question-category/add-question-category.component";
import { AddQuestionComponent } from "./add-question/add-question.component";
import { AddImageCategoryComponent } from "./add-image-category/add-image-category.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EditImageDialogComponent } from "./edit-image-dialog/edit-image-dialog.component";
import { NgxFileHelpersModule } from "ngx-file-helpers";
import { ImageCropperModule } from "ngx-image-cropper";
import { ImageDetailsComponent } from './image-details/image-details.component';
import { MomentModule } from 'ngx-moment';

@NgModule({
  declarations: [
    ActionConfirmDialogComponent,
    AddQuestionCategoryComponent,
    AddQuestionComponent,
    AddImageCategoryComponent,
    EditImageDialogComponent,
    ImageDetailsComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxFileHelpersModule,
    ImageCropperModule,
    MomentModule
  ],
  exports: [
    ActionConfirmDialogComponent,
    AddQuestionCategoryComponent,
    AddQuestionComponent,
    AddImageCategoryComponent,
    EditImageDialogComponent,
    ImageDetailsComponent,
  ],
  entryComponents: [
    ActionConfirmDialogComponent,
    AddQuestionCategoryComponent,
    AddQuestionComponent,
    AddImageCategoryComponent,
    EditImageDialogComponent,
    ImageDetailsComponent,
  ],
})
export class DialogsModule {}
