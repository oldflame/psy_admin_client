import { Injectable } from "@angular/core";
import { DataService } from "./data.service";
import { BehaviorSubject, Observable, of } from "rxjs";
import { Question } from "../models/question";
import { AddQuestionParams } from "../models/request-params";
import { QUESTIONS_API, HTTP_RESPONSE_STATUS } from "../constants";
import { catchError, map } from "rxjs/operators";
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import * as _ from "lodash";

@Injectable({
  providedIn: "root",
})
export class QuestionsService {
  private questionSubject = new BehaviorSubject(null);
  questions$: Observable<Question[]> = this.questionSubject.asObservable();

  constructor(private dataService: DataService) {}

  getQuestions() {
    this.dataService.sendGET("");
  }

  addQuestion(requestBody: AddQuestionParams): Observable<boolean> {
    return this.dataService
      .sendPOST(QUESTIONS_API.ADD_QUESTION, requestBody)
      .pipe(
        map(
          (res: HttpResponse<any>) => {
            if (res.status == HTTP_RESPONSE_STATUS.OK) {
              const categories: Question[] = this.questionSubject.value;
              categories.push(res.body);
              this.questionSubject.next(_.cloneDeep(categories));
            }
            return res.status == HTTP_RESPONSE_STATUS.OK;
          },
          catchError((err: HttpErrorResponse) => {
            console.log("Add location error", err);
            return of(false);
          })
        )
      );
  }
}
