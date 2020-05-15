import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { AddQuestionComponent } from "../../general/dialogs/add-question/add-question.component";
import { switchMap, map } from "rxjs/operators";
import { EMPTY, Observable } from "rxjs";
import { QuestionsService } from "src/app/services/questions.service";
import { CategoryService } from 'src/app/services/category.service';
import { QuestionCategory } from 'src/app/models/question-category';
import { ActionConfirmDialogComponent } from '../../general/dialogs/action-confirm-dialog/action-confirm-dialog.component';
import { ToastService, TOAST_TYPE } from 'src/app/services/toast.service';
import { Question } from 'src/app/models/question';
import { FormControl } from '@angular/forms';
import * as _ from "lodash";


@Component({
  selector: "questions",
  templateUrl: "./questions.component.html",
  styleUrls: ["./questions.component.scss"],
})
export class QuestionsComponent implements OnInit {
  dialogRef;
  questions$: Observable<Question[]>;
  searchTerms: string[] = [];
  showAllQuestions: false;
  deletedQuestionsToggle = new FormControl(false);

  constructor(
    private dialog: MatDialog,
    private questionService: QuestionsService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.questions$ = this.questionService.questions$.pipe(
      map((questionCategories: Question[]) => {
        if (questionCategories && questionCategories.length > 0) {
          if (!this.showAllQuestions) {
            questionCategories = questionCategories.filter(question => !question.isDeleted)
          }
          questionCategories = _.sortBy(questionCategories, "name");
        }
        return questionCategories;
      })
    );
    this.questionService.getQuestions().subscribe();

    this.deletedQuestionsToggle.valueChanges.subscribe((value) => {
      this.showAllQuestions = value;
      this.questionService.rebroadcastCategoriesData();
    })
  }

  searchTextChanged(eventArgs) {
    this.searchTerms = eventArgs.searchTerms;
    console.log("Search for", this.searchTerms);
  }

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

  deleteQuestion(eventArgs: any) {
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
            "Question Deleted Successfully!",
            TOAST_TYPE.SUCCESS
          );
        } else {
          this.toastService.showToast(
            "Failed to delete Question. Try again!",
            TOAST_TYPE.DANGER
          );
        }
      });
  }

  restoreQuestion(eventArgs: any) {
    this.dialogRef = this.dialog.open(ActionConfirmDialogComponent, {
      width: "450px",
      closeOnNavigation: true,
      data: {
        title: "Confirm Restore Question",
        messageLine1: "Are you sure you want to restore the question?",
        successText: "Restore",
      },
    });

    this.dialogRef
      .afterClosed()
      .pipe(
        switchMap((res: boolean) => {
          if (res) {
            return this.questionService.deleteQuestion(
              eventArgs.categoryID,
              true
            );
          }
          return EMPTY;
        })
      )
      .subscribe((serverRes: boolean) => {
        if (serverRes) {
          this.toastService.showToast(
            "Question restored Successfully!",
            TOAST_TYPE.SUCCESS
          );
        } else {
          this.toastService.showToast(
            "Failed to restore Question. Try again!",
            TOAST_TYPE.DANGER
          );
        }
      });
  }
}
