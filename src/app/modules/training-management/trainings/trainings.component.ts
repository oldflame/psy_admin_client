import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { AddTrainingComponent } from "../../general/dialogs/add-training/add-training.component";
import { switchMap, map } from "rxjs/operators";
import { EMPTY, Observable } from "rxjs";
import { TrainingService } from "src/app/services/training.service";
import { Training } from "src/app/models/trainings";
import { ActionConfirmDialogComponent } from "../../general/dialogs/action-confirm-dialog/action-confirm-dialog.component";
import { ToastService, TOAST_TYPE } from "src/app/services/toast.service";
import { FormControl } from "@angular/forms";
import { HttpErrorResponse } from "@angular/common/http";
import * as _ from "lodash";
import { Router } from '@angular/router';

@Component({
  selector: "trainings",
  templateUrl: "./trainings.component.html",
  styleUrls: ["./trainings.component.scss"],
})
export class TrainingsComponent implements OnInit {
  dialogRef;
  trainings$: Observable<Training[]>;
  searchTerms: string[] = [];
  showAllTrainings: false;
  deletedTrainingToggle = new FormControl(false);

  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.trainings$ = this.trainingService.trainings$.pipe(
      map((trainings: Training[]) => {
        if (trainings && trainings.length > 0) {
          if (!this.showAllTrainings) {
            trainings = trainings.filter(
              (training) => !training.isDeleted
            );
          }
          trainings = _.sortBy(trainings, "name");
        }
        return trainings;
      })
    );
    this.trainingService.getAllTrainings().subscribe(
      () => {},
      (err: HttpErrorResponse) => {
        this.toastService.showToast(err.error.msg, TOAST_TYPE.DANGER);
      }
    );

    this.deletedTrainingToggle.valueChanges.subscribe((value) => {
      this.showAllTrainings = value;
      this.trainingService.rebroadcastTrainingsData();
    });
  }

  searchTextChanged(eventArgs) {
    this.searchTerms = eventArgs.searchTerms;
    console.log("Search for", this.searchTerms);
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
      .subscribe(
        () => {},
        (err: HttpErrorResponse) => {
          this.toastService.showToast(err.error.msg, TOAST_TYPE.DANGER);
        }
      );
  }

  deleteTraining(eventArgs: any) {
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
            return this.trainingService.deleteTraining(eventArgs.categoryID);
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

  restoreTraining(eventArgs: any) {
    this.dialogRef = this.dialog.open(ActionConfirmDialogComponent, {
      width: "450px",
      closeOnNavigation: true,
      data: {
        title: "Confirm Restore Training",
        messageLine1: "Are you sure you want to restore the training?",
        successText: "Restore",
      },
    });

    this.dialogRef
      .afterClosed()
      .pipe(
        switchMap((res: boolean) => {
          if (res) {
            return this.trainingService.deleteTraining(
              eventArgs.categoryID,
              true
            );
          }
          return EMPTY;
        })
      )
      .subscribe(
        (serverRes: boolean) => {
          if (serverRes) {
            this.toastService.showToast(
              "Training restored Successfully!",
              TOAST_TYPE.SUCCESS
            );
          } else {
            this.toastService.showToast(
              "Failed to restore Training. Try again!",
              TOAST_TYPE.DANGER
            );
          }
        },
        (err: HttpErrorResponse) => {
          this.toastService.showToast(err.error.msg, TOAST_TYPE.DANGER);
        }
      );
  }

  viewTraining(eventArgs: any) {
    this.router.navigate(['/training-management/trainings/manage'],{queryParams: {id: eventArgs.category._id}})
  }
}
