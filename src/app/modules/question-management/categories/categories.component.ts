import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { switchMap, map } from "rxjs/operators";
import { QuestionCategory } from "src/app/models/question-category";
import { EMPTY, Observable } from "rxjs";
import { CategoryService } from "src/app/services/category.service";
import { AddQuestionCategoryComponent } from "../../general/dialogs/add-question-category/add-question-category.component";
import * as _ from "lodash";
import { TOAST_TYPE, ToastService } from "src/app/services/toast.service";
import { ActionConfirmDialogComponent } from "../../general/dialogs/action-confirm-dialog/action-confirm-dialog.component";
import { FormControl } from '@angular/forms';

@Component({
  selector: "categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.scss"],
})
export class CategoriesComponent implements OnInit {
  dialogRef;
  categories$: Observable<QuestionCategory[]>;
  showAllCategories = false;
  deletedCategoriesToggle = new FormControl(false);

  constructor(
    private dialog: MatDialog,
    private categoryService: CategoryService,
    private toastService: ToastService
  ) {}
  searchTerms: string[] = [];
  ngOnInit(): void {
    this.categories$ = this.categoryService.categories$.pipe(
      map((questionCategories: QuestionCategory[]) => {
        if (questionCategories && questionCategories.length > 0) {
          if (!this.showAllCategories) {
            questionCategories = questionCategories.filter(category => !category.isDeleted)
          }
          questionCategories = _.sortBy(questionCategories, "name");
        }
        return questionCategories;
      })
    );
    this.categoryService.getAllQuestionCategories().subscribe();

    this.deletedCategoriesToggle.valueChanges.subscribe((value) => {
      this.showAllCategories = value;
      this.categoryService.rebroadcastCategoriesData();
    })
  }

  searchTextChanged(eventArgs) {
    this.searchTerms = eventArgs.searchTerms;
    console.log("Search for", this.searchTerms);
  }

  restoreCategory(eventArgs: any) {
    this.dialogRef = this.dialog.open(ActionConfirmDialogComponent, {
      width: "450px",
      closeOnNavigation: true,
      data: {
        title: "Confirm Restore Category",
        messageLine1: "Are you sure you want to restore the category?",
        successText: "Restore",
      },
    });

    this.dialogRef
      .afterClosed()
      .pipe(
        switchMap((res: boolean) => {
          if (res) {
            return this.categoryService.deleteQuestionCategory(
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
            "Category restored Successfully!",
            TOAST_TYPE.SUCCESS
          );
        } else {
          this.toastService.showToast(
            "Failed to restore category. Try again!",
            TOAST_TYPE.DANGER
          );
        }
      });
  }

  showAddCategoryDialog() {
    this.dialogRef = this.dialog.open(AddQuestionCategoryComponent, {
      width: "800px",
      closeOnNavigation: true,
    });

    this.dialogRef
      .afterClosed()
      .pipe(
        switchMap((res: any) => {
          if (res) {
            return this.categoryService.addQuestionCategory(res);
          }
          return EMPTY;
        })
      )
      .subscribe();
  }

  deleteCategory(eventArgs: any) {
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
            return this.categoryService.deleteQuestionCategory(
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
