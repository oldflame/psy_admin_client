import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { EMPTY } from "rxjs";
import { TrainingService } from "src/app/services/training.service";
import { Training } from "src/app/models/trainings";
import { MatDialog } from "@angular/material/dialog";
import { SelectQuestionDialogComponent } from "../../general/dialogs/select-question-dialog/select-question-dialog.component";
import { SelectImageDialogComponent } from "../../general/dialogs/select-image-dialog/select-image-dialog.component";
import * as _ from "lodash";
import { IMAGE_TYPE_OPTIONS, TRAINING_ACTION_TYPE } from "../../../constants";

@Component({
  selector: "update-training",
  templateUrl: "./update-training.component.html",
  styleUrls: ["./update-training.component.scss"],
})
export class UpdateTrainingComponent implements OnInit {
  training: Training;
  trainingId: string;
  dialogRef;
  trainingConfigurationForUI;

  trainingConfigurationDisplayColumns = ["order", "actionType", "category", "duration", "imageType", "count"];

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private trainingService: TrainingService
  ) {}

  ngOnInit(): void {
    this.getTrainingData();
  }

  getTrainingData() {
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
        this.training = training;
        this.training.imageData.forEach((config) => {
          config.imageTypeName = this.getImageTypeNameByValue(config.imageType);
          config.actionType = TRAINING_ACTION_TYPE.IMAGE;
        });

        this.training.questionData.forEach(
          (config) => (config.actionType = TRAINING_ACTION_TYPE.QUESTION)
        );

        this.trainingConfigurationForUI = _.sortBy(
          _.concat(this.training.imageData, this.training.questionData),
          (config) => parseInt(config.orderNumber, 10)
        );
      });
  }

  showQuestionSelectDialog() {
    this.dialogRef = this.dialog.open(SelectQuestionDialogComponent, {
      width: "600px",
      closeOnNavigation: true,
    });
    this.dialogRef
      .afterClosed()
      .pipe(
        switchMap((result) => {
          if (result) {
            return this.trainingService.assignQuestionsToTraining(
              this.trainingId,
              result
            );
          }
          return EMPTY;
        })
      )
      .subscribe(() => {
        this.getTrainingData();
      });
  }

  showImageSelectDialog() {
    this.dialogRef = this.dialog.open(SelectImageDialogComponent, {
      width: "600px",
      closeOnNavigation: true,
    });
    this.dialogRef
      .afterClosed()
      .pipe(
        switchMap((result) => {
          if (result) {
            return this.trainingService.assignImagesToTraining(
              this.trainingId,
              result
            );
          }
          return EMPTY;
        })
      )
      .subscribe(() => {
        this.getTrainingData();
      });
  }

  getImageTypeNameByValue(value: number): string {
    const imageType = _.find(IMAGE_TYPE_OPTIONS, { value });
    return imageType ? imageType.viewValue : "";
  }
}
