import { Component, OnInit } from "@angular/core";
import { Observable, EMPTY } from "rxjs";
import { ImageManagementService } from "../../../services/image-management.service";
import * as _ from "lodash";
import { map, switchMap } from "rxjs/operators";
import { Category } from "src/app/models/category";
import { MatDialog } from "@angular/material/dialog";
import { ActionConfirmDialogComponent } from "../../general/dialogs/action-confirm-dialog/action-confirm-dialog.component";
import { ToastService, TOAST_TYPE } from "../../../services/toast.service";
import { AddImageCategoryComponent } from '../../general/dialogs/add-image-category/add-image-category.component';
import { AddImageCategoryParams } from '../../../models/request-params';
import { FormControl } from '@angular/forms';

@Component({
  selector: "categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.scss"],
})
export class CategoriesComponent implements OnInit {
  categories$: Observable<Category[]>;
  dialogRef;

  deletedCategoriesToggle = new FormControl(false);
  showAllCategories = false;

  searchTerms: string[] = [];

  constructor(
    private imageManagementService: ImageManagementService,
    private dialog: MatDialog,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.categories$ = this.imageManagementService.imageCategories$.pipe(
      map((imageCategories: Category[]) => {
        if (imageCategories && imageCategories.length > 0) {
          if (!this.showAllCategories) {
            imageCategories = imageCategories.filter(category => !category.isDeleted)
          }
          imageCategories = _.sortBy(imageCategories, "name");
        }
        return imageCategories;
      })
    );
    this.imageManagementService.getAllImageCategories().subscribe();

    this.deletedCategoriesToggle.valueChanges.subscribe((value) => {
      this.showAllCategories = value;
      this.imageManagementService.rebroadcastCategoriesData();
    })
  }

  searchTextChanged(eventArgs) {
    this.searchTerms = eventArgs.searchTerms;
    console.log("Search for", this.searchTerms);
  }

  deleteCategory(eventArgs: any) {
    this.dialogRef = this.dialog.open(ActionConfirmDialogComponent, {
      width: "450px",
      closeOnNavigation: true,
      data: {
        title: "Confirm Delete Category",
        messageLine1: "Are you sure you want to delete the category?",
        successText: "Delete",
      },
    });

    this.dialogRef
      .afterClosed()
      .pipe(
        switchMap((res: boolean) => {
          if (res) {
            return this.imageManagementService.deleteCategory(
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
            return this.imageManagementService.deleteCategory(
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

  addNewImageCategory() {
    this.dialogRef = this.dialog.open(AddImageCategoryComponent, {
      width: "550px",
      closeOnNavigation: true
    });

    this.dialogRef.afterClosed().pipe(switchMap((res: AddImageCategoryParams) => {
      if (res) {
        return this.imageManagementService.addCategory(res);
      }
      return EMPTY;
    })).subscribe((res: boolean) => {
      if (res) {
        this.toastService.showToast("Image Category added successfully!", TOAST_TYPE.SUCCESS);
      } else {
        this.toastService.showToast("Failed to add image category. Try again!", TOAST_TYPE.DANGER);
      }
    })
  }
}
