import { Injectable } from "@angular/core";
import {BehaviorSubject, Observable, of, throwError} from "rxjs";
import { Location } from "../models/location";
import { DataService } from "./data.service";
import {LOCATIONS_API, HTTP_RESPONSE_STATUS } from "../constants";
import { HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { AddLocationParams } from "../models/request-params";
import * as _ from "lodash";

@Injectable({
  providedIn: "root",
})
export class LocationsService {
  private locationSubject = new BehaviorSubject(null);
  locations$: Observable<Location[]> = this.locationSubject.asObservable();

  constructor(private dataService: DataService) {}

    getLocations() {
        return this.dataService
            .sendGET(LOCATIONS_API.GET_ALL_LOCATIONS)
            .pipe(
                map(
                    (res: HttpResponse<any>) => {
                        if (res.status == HTTP_RESPONSE_STATUS.OK) {
                            this.locationSubject.next(res.body);
                        } else {
                            this.locationSubject.next([]);
                        }
                        return res.status == HTTP_RESPONSE_STATUS.OK;
                    },
                    catchError((err: HttpErrorResponse) => {
                        this.locationSubject.next([]);
                        return throwError(err.error);
                    })
                )
            );
    }

  getActiveLocations(): Observable<boolean> {
    return this.dataService.sendGET(LOCATIONS_API.GET_ACTIVE_LOCATIONS).pipe(
      map(
        (res: HttpResponse<any>) => {
          if (res.status == HTTP_RESPONSE_STATUS.OK) {
            this.locationSubject.next(res.body);
          } else {
            this.locationSubject.next([]);
          }
          return res.status == HTTP_RESPONSE_STATUS.OK;
        },
        catchError((err: HttpErrorResponse) => {
          this.locationSubject.next([]);
          return of(false);
        })
      )
    );
  }

  addNewLocation(requestBody: AddLocationParams): Observable<boolean> {
    return this.dataService
      .sendPOST(LOCATIONS_API.ADD_LOCATION, requestBody)
      .pipe(
        map(
          (res: HttpResponse<any>) => {
            if (res.status == HTTP_RESPONSE_STATUS.OK) {
              // Extract current state of the observable
              const locations: Location[] = this.locationSubject.value;

              // push the newly added location to the array
              locations.push(res.body);

              // broadcast the new array to all subscribers

              // cloneDeep is a function in the lodash library that creates a deep clone of
              // the array to trigger angular's change detection
              this.locationSubject.next(_.cloneDeep(locations));
            }
            return res.status == HTTP_RESPONSE_STATUS.OK;
          },
          catchError((err: HttpErrorResponse) => {
            return of(false);
          })
        )
      );
  }

  deleteLocation(locationID: string, doRestore?: boolean): Observable<boolean> {
    return this.dataService
      .sendDELETE(
        LOCATIONS_API.DELETE_LOCATION.replace(
            "{locationID}", locationID)
            .replace("{doRestore}", (doRestore ? "restore" : "delete"))
      )
      .pipe(
        map(
          (res: HttpResponse<any>) => {
            if (res.status == HTTP_RESPONSE_STATUS.OK) {
              // Extract current state of the observable
              const locations: Location[] = this.locationSubject.value;

              // find index of the currently deleted location from locations array
              const locationIndexToDelete = _.findIndex(locations, {
                _id: locationID,
              });

              // Remove the location at that index from the array
              // locations.splice(locationIndexToDelete, 1);

              // Broadcast the new array to all subscribers
              // this.locationSubject.next(_.cloneDeep(locations));
                if (locationIndexToDelete != -1) {
                    locations[locationIndexToDelete].isDeleted = !doRestore;
                    this.locationSubject.next(_.cloneDeep(locations));
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

    rebroadcastLocationsData() {
        this.locationSubject.next(_.cloneDeep(this.locationSubject.value))
    }
}
