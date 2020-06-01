import { Injectable } from "@angular/core";
import { AddTrainingParams, AssignQuestionsToTrainings, AssignImagesToTrainings } from "../models/request-params";
import { Observable, of, BehaviorSubject, throwError } from 'rxjs';
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
            return of(false);
          })
        )
      );
  }

  assignQuestionsToTraining(trainingId: string, requestBody: any): Observable<any> {
    return this.dataService.sendPUT(TRAININGS_API.ASSIGN_QUESTIONS_TO_TRAINING.replace("{trainingId}",trainingId),requestBody).pipe(
      map(
        (res: HttpResponse<any>) => {
          if(res.status == HTTP_RESPONSE_STATUS.OK) {
            return res.body;
          }
          return null;
        },
        catchError((err: HttpErrorResponse) => {
        return throwError(err.error);
        })
      )
    )
  }

  removeQuestionsFromTraining(trainingId: string, questionDataId: string): Observable<boolean> {
    return this.dataService.sendDELETE(TRAININGS_API.REMOVE_QUESTIONS_FROM_TRAINING.replace("{trainingId}",trainingId).replace("{questionDataId}",questionDataId)).pipe(
      map(
        (res: HttpResponse<any>) => {
          return res.status == HTTP_RESPONSE_STATUS.OK;
        },
        catchError((err: HttpErrorResponse) => {
        return throwError(err.error);
        })
      )
    )
  }

  assignImagesToTraining(trainingId: string, requestBody: any): Observable<boolean> {
    return this.dataService.sendPUT(TRAININGS_API.ASSIGN_IMAGES_TO_TRAINING.replace("{trainingId}",trainingId),requestBody).pipe(
      map(
        (res: HttpResponse<any>) => {
          if(res.status == HTTP_RESPONSE_STATUS.OK) {
            return res.body;
          }
          return null;
        },
        catchError((err: HttpErrorResponse) => {
        return throwError(err.error);
        })
      )
    )
  }

  removeImagesFromTraining(trainingId: string, imageDataId: string): Observable<boolean> {
    return this.dataService.sendDELETE(TRAININGS_API.REMOVE_IMAGES_FROM_TRAINING.replace("{trainingId}",trainingId).replace("{imageDataId}",imageDataId)).pipe(
      map(
        (res: HttpResponse<any>) => {
          return res.status == HTTP_RESPONSE_STATUS.OK;
        },
        catchError((err: HttpErrorResponse) => {
        return throwError(err.error);
        })
      )
    )
  }

  getTrainingById(trainingId: string): Observable<Training> {
    return this.dataService.sendGET(TRAININGS_API.GET_TRAINING_BY_ID.replace("{trainingId}",trainingId)).pipe(
      map(
        (res: HttpResponse<any>) => {
          if (res.status == HTTP_RESPONSE_STATUS.OK) {
            return res.body;
          }
          return null;
        },
        catchError((err: HttpErrorResponse) => {
          this.trainingSubject.next([]);
        return throwError(err.error);
        })
      )
    )
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

  deleteTraining(trainingId: string, doRestore?: boolean): Observable<boolean> {
    return this.dataService
      .sendDELETE(
        TRAININGS_API.DELETE_TRAINING.replace(
          "{trainingId}",
          trainingId
        ).replace("{doRestore}", (doRestore ? "restore" : "delete"))
      )
      .pipe(
        map(
          (res: HttpResponse<any>) => {
            if (res.status == HTTP_RESPONSE_STATUS.OK) {
              const trainings = this.trainingSubject.value;
              const trainingIndexToDelete = _.findIndex(trainings, {
                _id: trainingId,
              });
              if (trainingIndexToDelete != -1) {
                trainings[trainingIndexToDelete].isDeleted = !doRestore;
                this.trainingSubject.next(_.cloneDeep(trainings));
              }
            }
            return res.status == HTTP_RESPONSE_STATUS.OK;
          },
          catchError((err: HttpErrorResponse) => {
            return of(false);
          })
        )
      );
  }

  rebroadcastTrainingsData() {
    this.trainingSubject.next(_.cloneDeep(this.trainingSubject.value))
  }
}
