import { Injectable } from "@angular/core";
import { AddTrainingParams } from "../models/request-params";
import { Observable, of, BehaviorSubject } from "rxjs";
import { DataService } from "./data.service";
import { QUESTIONS_API, HTTP_RESPONSE_STATUS, TRAININGS_API } from "../constants";
import { map, catchError } from "rxjs/operators";
import { HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Training } from "../models/trainings";
import * as _ from "lodash";

@Injectable({
  providedIn: "root",
})
export class TrainingService {
  private trainingSubject = new BehaviorSubject(null);
  trainings$: Observable<Training[]> = this.trainingSubject.asObservable();

  constructor(private dataService: DataService) {}

  addTraining(requestBody: AddTrainingParams): Observable<boolean> {
    return this.dataService
      .sendPOST(TRAININGS_API.ADD_TRAINING, requestBody)
      .pipe(
        map(
          (res: HttpResponse<any>) => {
            if (res.status == HTTP_RESPONSE_STATUS.OK) {
              const trainings: Training[] = this.trainingSubject.value;
              trainings.push(res.body);
              this.trainingSubject.next(_.cloneDeep(trainings));
            }
            return res.status == HTTP_RESPONSE_STATUS.OK;
          },
          catchError((err: HttpErrorResponse) => {
            console.log("Add Training error", err);
            return of(false);
          })
        )
      );
  }

  getAllTrainings(): Observable<boolean> {
    return this.dataService
      .sendGET(TRAININGS_API.GET_ALL_TRAININGS)
      .pipe(
        map(
          (res: HttpResponse<any>) => {
            if (res.status == HTTP_RESPONSE_STATUS.OK) {
              this.trainingSubject.next(res.body);
            } else {
              this.trainingSubject.next([]);
            }
            return res.status == HTTP_RESPONSE_STATUS.OK;
          },
          catchError((err: HttpErrorResponse) => {
            this.trainingSubject.next([]);
            return of(false);
          })
        )
      );
  }

  deleteTraining(trainingId: string): Observable<boolean> {
    return this.dataService
      .sendDELETE(
        TRAININGS_API.DELETE_TRAINING.replace(
          "{trainingId}",
          trainingId
        )
      )
      .pipe(
        map(
          (res: HttpResponse<any>) => {
            if (res.status == HTTP_RESPONSE_STATUS.OK) {
              const trainings = this.trainingSubject.value;
              const trainingIndexToDelete = _.findIndex(trainings, {
                _id: trainingId,
              });
              trainings.splice(trainingIndexToDelete, 1);
              this.trainingSubject.next(_.cloneDeep(trainings));
            }
            return res.status == HTTP_RESPONSE_STATUS.OK;
          },
          catchError((err: HttpErrorResponse) => {
            console.log("Delete Question Category error", err);
            return of(false);
          })
        )
      );
  }
}
