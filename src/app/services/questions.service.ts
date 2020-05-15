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
    return this.dataService
    .sendGET(QUESTIONS_API.GET_ALL_QUESTIONS)
    .pipe(
      map(
        (res: HttpResponse<any>) => {
          if (res.status == HTTP_RESPONSE_STATUS.OK) {
            this.questionSubject.next(res.body);
          } else {
            this.questionSubject.next([]);
          }
          return res.status == HTTP_RESPONSE_STATUS.OK;
        },
        catchError((err: HttpErrorResponse) => {
          console.log("Get Questions error", err);
          this.questionSubject.next([]);
          return of(false);
        })
      )
    );
  }

  addQuestion(requestBody: AddQuestionParams): Observable<boolean> {
    return this.dataService
      .sendPOST(QUESTIONS_API.ADD_QUESTION, requestBody)
      .pipe(
        map(
          (res: HttpResponse<any>) => {
            if (res.status == HTTP_RESPONSE_STATUS.OK) {
              const questions: Question[] = this.questionSubject.value;
              questions.push(res.body);
              this.questionSubject.next(_.cloneDeep(questions));
            }
            return res.status == HTTP_RESPONSE_STATUS.OK;
          },
          catchError((err: HttpErrorResponse) => {
            console.log("Add Question error", err);
            return of(false);
          })
        )
      );
  }

  deleteQuestion(questionId: string): Observable<boolean> {
    return this.dataService
      .sendDELETE(
        QUESTIONS_API.DELETE_QUESTION.replace(
          "{questionId}",
          questionId
        )
      )
      .pipe(
        map(
          (res: HttpResponse<any>) => {
            if (res.status == HTTP_RESPONSE_STATUS.OK) {
              const questions = this.questionSubject.value;
              const categoryIndexToDelete = _.findIndex(questions, {
                _id: questionId,
              });
              questions.splice(categoryIndexToDelete, 1);
              this.questionSubject.next(_.cloneDeep(questions));
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
