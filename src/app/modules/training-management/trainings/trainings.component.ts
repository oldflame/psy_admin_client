import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTrainingComponent } from '../../general/dialogs/add-training/add-training.component';
import { switchMap } from 'rxjs/operators';
import { EMPTY, Observable } from 'rxjs';
import { TrainingService } from 'src/app/services/training.service';
import { Training } from 'src/app/models/trainings';
import { ActionConfirmDialogComponent } from '../../general/dialogs/action-confirm-dialog/action-confirm-dialog.component';
import { ToastService, TOAST_TYPE } from 'src/app/services/toast.service';

@Component({
  selector: 'trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.scss']
})
export class TrainingsComponent implements OnInit {

  dialogRef;
  trainings$: Observable<Training[]>;
  constructor(private dialog: MatDialog, private trainingService: TrainingService, private toastService: ToastService) { }

  ngOnInit(): void {
    this.trainings$ = this.trainingService.trainings$.pipe();
    this.trainingService.getAllTrainings().subscribe();
  }

  showAddTrainingDialog() {
    this.dialogRef = this.dialog.open(AddTrainingComponent, {
      width: "800px",
      closeOnNavigation: true,
    });

    this.dialogRef
      .afterClosed()
      .pipe(
        switchMap((res: any) => {
          if (res) {
            return this.trainingService.addTraining(res);
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
        title: "Confirm Delete Training",
        messageLine1: "Are you sure you want to delete the training?",
        messageLine2: "This cannot be undone.",
        successText: "Delete",
      },
    });

    this.dialogRef
      .afterClosed()
      .pipe(
        switchMap((res: boolean) => {
          if (res) {
            return this.trainingService.deleteTraining(
              eventArgs.categoryID
            );
          }
          return EMPTY;
        })
      )
      .subscribe((serverRes: boolean) => {
        if (serverRes) {
          this.toastService.showToast(
            "Training Deleted Successfully!",
            TOAST_TYPE.SUCCESS
          );
        } else {
          this.toastService.showToast(
            "Failed to delete Training. Try again!",
            TOAST_TYPE.DANGER
          );
        }
      });
  }
}
