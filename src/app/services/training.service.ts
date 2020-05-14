import { Injectable } from "@angular/core";
import { AddTrainingParams } from "../models/request-params";
import { Observable, of, BehaviorSubject } from "rxjs";
import { DataService } from "./data.service";
import { QUESTIONS_API, HTTP_RESPONSE_STATUS } from "../constants";
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
      .sendPOST(QUESTIONS_API.ADD_QUESTION, requestBody)
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
}
