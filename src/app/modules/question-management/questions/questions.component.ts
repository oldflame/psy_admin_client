import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { AddQuestionComponent } from "../../general/dialogs/add-question/add-question.component";
import { switchMap } from "rxjs/operators";
import { EMPTY } from "rxjs";
import { QuestionsService } from "src/app/services/questions.service";
import { CategoryService } from 'src/app/services/category.service';
import { QuestionCategory } from 'src/app/models/question-category';
import { ActionConfirmDialogComponent } from '../../general/dialogs/action-confirm-dialog/action-confirm-dialog.component';
import { ToastService, TOAST_TYPE } from 'src/app/services/toast.service';

@Component({
  selector: "questions",
  templateUrl: "./questions.component.html",
  styleUrls: ["./questions.component.scss"],
})
export class QuestionsComponent implements OnInit {
  dialogRef;
  constructor(
    private dialog: MatDialog,
    private questionService: QuestionsService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {}


  showAddQuestionDialog() {
    this.dialogRef = this.dialog.open(AddQuestionComponent, {
      width: "800px",
      closeOnNavigation: true,
    });

    this.dialogRef
      .afterClosed()
      .pipe(
        switchMap((res: any) => {
          if (res) {
            return this.questionService.addQuestion(res);
          }
          return EMPTY;
        })
      )
      .subscribe();
  }

  deleteCategory(eventArgs: any) {
    console.log("deleting location", eventArgs);
    this.dialogRef = this.dialog.open(ActionConfirmDialogComponent, {
      width: "450px",
      closeOnNavigation: true,
      data: {
        title: "Confirm Delete Category",
        messageLine1: "Are you sure you want to delete the category?",
        messageLine2: "This cannot be undone.",
        successText: "Delete",
      },
    });

    this.dialogRef
      .afterClosed()
      .pipe(
        switchMap((res: boolean) => {
          if (res) {
            return this.questionService.deleteQuestion(
              eventArgs.categoryID
            );
          }
          return EMPTY;
        })
      )
      .subscribe((serverRes: boolean) => {
        if (serverRes) {
          this.toastService.showToast(
            "Category Deleted Successfully!",
            TOAST_TYPE.SUCCESS
          );
        } else {
          this.toastService.showToast(
            "Failed to delete category. Try again!",
            TOAST_TYPE.DANGER
          );
        }
      });
  }
}
