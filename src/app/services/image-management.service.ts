import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { DataService } from "./data.service";
import { IMAGES_API, HTTP_RESPONSE_STATUS } from "../constants";
import { HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import * as _ from "lodash";
import { Category } from "../models/category";
import {
  AddImageCategoryParams,
  AddImageParams,
} from "../models/request-params";
import { Image } from "../models/image";

@Injectable({
  providedIn: "root",
})
export class ImageManagementService {
  private categoriesSubject = new BehaviorSubject(null);
  imageCategories$: Observable<
    Category[]
  > = this.categoriesSubject.asObservable();

  private imagesSubject = new BehaviorSubject(null);
  images$: Observable<Image[]> = this.imagesSubject.asObservable();

  constructor(private dataService: DataService) {}

  // Image category services
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
          this.categoriesSubject.next([]);
          return of(false);
        })
      )
    );
  }

  deleteCategory(imageCategoryID: string): Observable<boolean> {
    return this.dataService
      .sendDELETE(
        IMAGES_API.DELETE_CATEGORY.replace("{imageCategoryID}", imageCategoryID)
      )
      .pipe(
        map(
          (res: HttpResponse<any>) => {
            if (res.status == HTTP_RESPONSE_STATUS.OK) {
              const imageCategories: Category[] = this.categoriesSubject.value;
              const imageCategoryIndexToDelete = _.findIndex(imageCategories, {
                _id: imageCategoryID,
              });

              if (imageCategoryIndexToDelete != -1) {
                imageCategories.splice(imageCategoryIndexToDelete, 1);
                this.categoriesSubject.next(_.cloneDeep(imageCategories));
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

  // Images Services
  getAllImages(skip: number, limit: number): Observable<boolean> {
    return this.dataService
      .sendGET(
        IMAGES_API.GET_ALL_IMAGES.replace("{skip}", skip + "").replace(
          "{limit}",
          limit + ""
        )
      )
      .pipe(
        map((res: HttpResponse<any>) => {
          if (res.status == HTTP_RESPONSE_STATUS.OK) {
            this.imagesSubject.next(res.body);
          } else {
            this.imagesSubject.next([]);
          }
          return res.status == HTTP_RESPONSE_STATUS.OK;
        }),
        catchError((err: HttpErrorResponse) => {
          console.log("Get images", err);
          this.imagesSubject.next([]);
          return of(false);
        })
      );
  }

  addNewImage(requestBody: AddImageParams): Observable<boolean> {
    return this.dataService.sendPOST(IMAGES_API.ADD_IMAGE, requestBody).pipe(
      map((res: HttpResponse<any>) => {
        if (res.status == HTTP_RESPONSE_STATUS.OK) {
          const images: Image[] = this.imagesSubject.value || [];
          images.push(res.body);
          this.imagesSubject.next(_.cloneDeep(images));
        }
        return res.status == HTTP_RESPONSE_STATUS.OK;
      }),
      catchError((err: HttpErrorResponse) => {
        console.log("Add image err", err);
        return of(false);
      })
    );
  }

  deleteImage(imageID: string): Observable<boolean> {
    return this.dataService
      .sendDELETE(IMAGES_API.DELETE_IMAGE.replace("{imageID}", imageID))
      .pipe(
        map(
          (res: HttpResponse<any>) => {
            if (res.status == HTTP_RESPONSE_STATUS.OK) {
              // Extract current state of the observable
              const images = this.imagesSubject.value;

              // find index of the currently deleted image from images array
              const imageIndexToDelete = _.findIndex(images, {
                _id: imageID,
              });

              // Remove the image at that index from the array
              images.splice(imageIndexToDelete, 1);

              // Broadcast the new array to all subscribers
              this.imagesSubject.next(_.cloneDeep(images));
            }
            return res.status == HTTP_RESPONSE_STATUS.OK;
          },
          catchError((err: HttpErrorResponse) => {
            console.log("Delete image error", err);
            return of(false);
          })
        )
      );
  }
}
