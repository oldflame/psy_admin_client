import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { DataService } from "./data.service";
import { AddCategoryParams } from "../models/request-params";
import { QUESTIONS_CATEGORY_API, HTTP_RESPONSE_STATUS } from "../constants";
import { HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { QuestionCategory } from "../models/question-category";
import { catchError, map } from "rxjs/operators";
import * as _ from "lodash";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  private categorySubject = new BehaviorSubject(null);
  categories$: Observable<
    QuestionCategory[]
  > = this.categorySubject.asObservable();

  constructor(private dataService: DataService) {}

  addQuestionCategory(requestBody: AddCategoryParams): Observable<boolean> {
    return this.dataService
      .sendPOST(QUESTIONS_CATEGORY_API.ADD_QUESTION_CATEGORY, requestBody)
      .pipe(
        map(
          (res: HttpResponse<any>) => {
            if (res.status == HTTP_RESPONSE_STATUS.OK) {
              const categories: QuestionCategory[] = this.categorySubject.value;
              categories.push(res.body);
              this.categorySubject.next(_.cloneDeep(categories));
            }
            return res.status == HTTP_RESPONSE_STATUS.OK;
          },
          catchError((err: HttpErrorResponse) => {
            return of(false);
          })
        )
      );
  }

  getAllQuestionCategories(): Observable<boolean> {
    return this.dataService
      .sendGET(QUESTIONS_CATEGORY_API.GET_ALL_QUESTION_CATEGORIES)
      .pipe(
        map(
          (res: HttpResponse<any>) => {
            if (res.status == HTTP_RESPONSE_STATUS.OK) {
              this.categorySubject.next(res.body);
            } else {
              this.categorySubject.next([]);
            }
            return res.status == HTTP_RESPONSE_STATUS.OK;
          },
          catchError((err: HttpErrorResponse) => {
            this.categorySubject.next([]);
            return of(false);
          })
        )
      );
  }

  deleteQuestionCategory(categoryId: string, doRestore?: boolean): Observable<boolean> {
    return this.dataService
      .sendDELETE(
        QUESTIONS_CATEGORY_API.DELETE_QUESTION_CATEGORY.replace(
          "{questionCategoryId}",
          categoryId
        ).replace("{doRestore}", (doRestore ? "restore" : "delete"))
      )
      .pipe(
        map(
          (res: HttpResponse<any>) => {
            if (res.status == HTTP_RESPONSE_STATUS.OK) {
              const categories = this.categorySubject.value;
              const categoryIndexToDelete = _.findIndex(categories, {
                _id: categoryId,
              });
              if (categoryIndexToDelete != -1) {
                categories[categoryIndexToDelete].isDeleted = !doRestore;
                this.categorySubject.next(_.cloneDeep(categories));
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

  rebroadcastCategoriesData() {
    this.categorySubject.next(_.cloneDeep(this.categorySubject.value))
  }
}
