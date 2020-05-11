import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { DataService } from "./data.service";
import { IMAGES_API, HTTP_RESPONSE_STATUS } from "../constants";
import { HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import * as _ from "lodash";
import { Category } from '../models/category';
import { AddImageCategoryParams } from '../models/request-params';

@Injectable({
  providedIn: "root",
})
export class ImageManagementService {
  private categoriesSubject = new BehaviorSubject(null);
  imageCategories$: Observable<
    Category[]
  > = this.categoriesSubject.asObservable();

  constructor(private dataService: DataService) {}

  addCategory(requestBody: AddImageCategoryParams): Observable<boolean> {
    return this.dataService.sendPOST(IMAGES_API.ADD_CATEGORY, requestBody).pipe(
      map(
        (res: HttpResponse<any>) => {
          if (res.status == HTTP_RESPONSE_STATUS.OK) {
            const imageCategories = this.categoriesSubject.value || [];
            imageCategories.push(res.body);
            this.categoriesSubject.next(_.cloneDeep(imageCategories));
          }
          return res.status == HTTP_RESPONSE_STATUS.OK;
        },
        catchError((err: HttpErrorResponse) => {
          console.log("Add image category err", err);
          return of(false);
        })
      )
    );
  }

  getActiveImageCategories(): Observable<boolean> {
    return this.dataService.sendGET(IMAGES_API.GET_ACTIVE_CATEGORIES).pipe(
      map(
        (res: HttpResponse<any>) => {
          if (res.status == HTTP_RESPONSE_STATUS.OK) {
            this.categoriesSubject.next(res.body);
          } else {
            this.categoriesSubject.next([]);
          }

          return res.status == HTTP_RESPONSE_STATUS.OK;
        },
        catchError((err: HttpErrorResponse) => {
          console.log("get active image categories err", err);
          this.categoriesSubject.next([]);
          return of(false);
        })
      )
    );
  }

  deleteCategory(imageCategoryID: string): Observable<boolean> {
    return this.dataService.sendPOST(IMAGES_API.ADD_CATEGORY.replace("{imageCategoryID}", imageCategoryID)).pipe(
      map(
        (res: HttpResponse<any>) => {
          if (res.status == HTTP_RESPONSE_STATUS.OK) {
            const imageCategories: Category[] = this.categoriesSubject.value;
            const imageCategoryIndexToDelete = _.findIndex(imageCategories, {_id: imageCategoryID});

            if (imageCategoryIndexToDelete != -1) {
              imageCategories.splice(imageCategoryIndexToDelete, 1);
              this.categoriesSubject.next(_.cloneDeep(imageCategories));
            }
          }
          return res.status == HTTP_RESPONSE_STATUS.OK;
        },
        catchError((err: HttpErrorResponse) => {
          console.log("Delete image category err", err);
          return of(false);
        })
      )
    );
  }
}
