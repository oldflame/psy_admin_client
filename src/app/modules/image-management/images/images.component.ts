import { Component, OnInit } from '@angular/core';
import { ImageManagementService } from '../../../services/image-management.service';
import { Observable, EMPTY } from 'rxjs';
import { Image } from '../../../models/image';
import { map, switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ActionConfirmDialogComponent } from '../../general/dialogs/action-confirm-dialog/action-confirm-dialog.component';
import { ToastService, TOAST_TYPE } from '../../../services/toast.service';

@Component({
  selector: 'images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit {
  images$: Observable<Image[]>;
  dialogRef;

  constructor(private imageManagementService: ImageManagementService, private dialog: MatDialog, private toastService: ToastService) { }

  ngOnInit(): void {
    this.images$ = this.imageManagementService.images$.pipe(map((images: Image[]) => {
      if (images && images.length > 0) {
        images = images.filter(image => !image.isDeleted)
      }

      return images;
    }));
    this.imageManagementService.getAllImages(0, 50).subscribe();
  }

  deleteImage(eventArgs: any) {
    this.dialogRef = this.dialog.open(ActionConfirmDialogComponent, {
      width: "450px",
      closeOnNavigation: true,
      data: {
        title: "Confirm Delete Category",
        messageLine1: "Are you sure you want to delete the image?",
        successText: "Delete",
      },
    });

    this.dialogRef
      .afterClosed()
      .pipe(
        switchMap((res: boolean) => {
          if (res) {
            return this.imageManagementService.deleteImage(
              eventArgs.imageID
            );
          }
          return EMPTY;
        })
      )
      .subscribe((serverRes: boolean) => {
        if (serverRes) {
          this.toastService.showToast(
            "Image deleted Successfully!",
            TOAST_TYPE.SUCCESS
          );
        } else {
          this.toastService.showToast(
            "Failed to delete image. Try again!",
            TOAST_TYPE.DANGER
          );
        }
      });
  }

  viewImage(eventArgs: any) {
  }
}
