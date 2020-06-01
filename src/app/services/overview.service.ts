import { Injectable } from "@angular/core";
import { DataService } from "./data.service";
import { Observable, throwError } from "rxjs";
import { OVERVIEW_API, HTTP_RESPONSE_STATUS } from "../constants";
import { HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class OverviewService {
  constructor(private dataService: DataService) {}

  getEntityCounts(): Observable<any> {
    return this.dataService.sendGET(OVERVIEW_API.GET_COUNTS).pipe(
      map((res: HttpResponse<any>) => {
        if (res.status == HTTP_RESPONSE_STATUS.OK) {
          return res.body;
        }
        return null;
      }),
      catchError((err: HttpErrorResponse) => {
        return throwError(err.error);
      })
    );
  }
}
