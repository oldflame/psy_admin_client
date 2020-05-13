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

@Component({
  selector: "categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.scss"],
})
export class CategoriesComponent implements OnInit {
  categories$: Observable<Category[]>;
  dialogRef;

  constructor(
    private imageManagementService: ImageManagementService,
    private dialog: MatDialog,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.categories$ = this.imageManagementService.imageCategories$.pipe(
      map((imageCategories: Category[]) => {
        if (imageCategories && imageCategories.length > 0) {
          imageCategories = _.sortBy(imageCategories, "name");
        }
        return imageCategories;
      })
    );
    this.imageManagementService.getActiveImageCategories().subscribe();
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
