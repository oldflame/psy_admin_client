import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { DataService } from './data.service';
import { AddCategoryParams } from '../models/request-params';
import { QUESTIONS_CATEGORY_API, HTTP_RESPONSE_STATUS } from '../constants';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { QuestionCategory } from '../models/question-category';
import { catchError, map } from 'rxjs/operators';
import * as _ from "lodash";


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categorySubject = new BehaviorSubject(null);
  categories$: Observable<QuestionCategory[]> = this.categorySubject.asObservable();

  constructor(private dataService: DataService) {}

  addQuestionCategory(requestBody: AddCategoryParams): Observable<boolean>  {
    return this.dataService.sendPOST(QUESTIONS_CATEGORY_API.ADD_QUESTION_CATEGORY, requestBody).pipe(
      map((res: HttpResponse<any>) => {
        if(res.status == HTTP_RESPONSE_STATUS.OK) {
          const categories: QuestionCategory[] = this.categorySubject.value;
          categories.push(res.body);
          this.categorySubject.next(_.cloneDeep(categories));
        }
        return res.status == HTTP_RESPONSE_STATUS.OK;
      },
      catchError((err: HttpErrorResponse) => {
        console.log("Add location error", err);
        return of(false);
      })
      )
    )
  }
}
