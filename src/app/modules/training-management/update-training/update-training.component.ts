import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { EMPTY } from "rxjs";
import { TrainingService } from "src/app/services/training.service";
import { Training } from "src/app/models/trainings";
import { MatDialog } from "@angular/material/dialog";
import { SelectQuestionDialogComponent } from "../../general/dialogs/select-question-dialog/select-question-dialog.component";
import { SelectImageDialogComponent } from "../../general/dialogs/select-image-dialog/select-image-dialog.component";

@Component({
  selector: "update-training",
  templateUrl: "./update-training.component.html",
  styleUrls: ["./update-training.component.scss"],
})
export class UpdateTrainingComponent implements OnInit {
  training: Training;
  trainingId: string;
  dialogRef;

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private trainingService: TrainingService
  ) {}

  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        switchMap((params: any) => {
          if (params && params.id) {
            this.trainingId = params.id;
            return this.trainingService.getTrainingById(params.id);
          }
          return EMPTY;
        })
      )
      .subscribe((training: Training) => {
        console.log("Training", training);
        this.training = training;
      });
  }

  showQuestionSelectDialog() {
    this.dialogRef = this.dialog.open(SelectQuestionDialogComponent, {
      width: "600px",
      closeOnNavigation: true,
    });
    this.dialogRef.afterClosed().pipe(
      switchMap((result) => {
        console.log("In parent",result);
        if(result) {
          return this.trainingService.assignQuestionsToTraining(this.trainingId,result);
        }
        return EMPTY
      }
    )).subscribe();
  }

  showImageSelectDialog() {
    this.dialogRef = this.dialog.open(SelectImageDialogComponent, {
      width: "600px",
      closeOnNavigation: true,
    });
    this.dialogRef.afterClosed().pipe(
      switchMap((result) => {
        if(result) {
          return this.trainingService.assignImagesToTraining(this.trainingId,result);
        }
        return EMPTY
      }
    )).subscribe();
  }
}
