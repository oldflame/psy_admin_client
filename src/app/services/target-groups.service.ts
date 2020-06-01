import { Injectable } from '@angular/core';
import {DataService} from "./data.service";
import {BehaviorSubject, Observable, of, throwError} from "rxjs";
import * as _ from "lodash";
import {TargetGroups} from "../models/target-groups";
import {
  HTTP_RESPONSE_STATUS,
  TARGET_GROUPS_API
} from "../constants";
import {catchError, map} from "rxjs/operators";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {AddTargetGroupsParams} from "../models/request-params";

@Injectable({
  providedIn: 'root'
})
export class TargetGroupsService {

    private targetGroupSubject = new BehaviorSubject(null);
    targetGroups$: Observable<TargetGroups[]> = this.targetGroupSubject.asObservable();

    constructor(private dataService: DataService) {
    }

    getTargetGroups() {
        return this.dataService
            .sendGET(TARGET_GROUPS_API.GET_ALL_TARGET_GROUPS)
            .pipe(
                map(
                    (res: HttpResponse<any>) => {
                        if (res.status == HTTP_RESPONSE_STATUS.OK) {
                            this.targetGroupSubject.next(res.body);
                        } else {
                            this.targetGroupSubject.next([]);
                        }
                        return res.status == HTTP_RESPONSE_STATUS.OK;
                    },
                    catchError((err: HttpErrorResponse) => {
                        this.targetGroupSubject.next([]);
                        return throwError(err.error);
                    })
                )
            );
    }

    addNewTargetGroup(requestBody: AddTargetGroupsParams): Observable<boolean> {
        return this.dataService
            .sendPOST(TARGET_GROUPS_API.ADD_TARGET_GROUP, requestBody)
            .pipe(
                map(
                    (res: HttpResponse<any>) => {
                        if (res.status == HTTP_RESPONSE_STATUS.OK) {
                            // Extract current state of the observable
                            const targetGroups: TargetGroups[] = this.targetGroupSubject.value;

                            // push the newly added target group to the array
                            targetGroups.push(res.body);

                            // broadcast the new array to all subscribers

                            // cloneDeep is a function in the lodash library that creates a deep clone of
                            // the array to trigger angular's change detection
                            this.targetGroupSubject.next(_.cloneDeep(targetGroups));
                        }
                        return res.status == HTTP_RESPONSE_STATUS.OK;
                    },
                    catchError((err: HttpErrorResponse) => {
                        return of(false);
                    })
                )
            );
    }

    deleteTargetGroup(targetGroupID: string, doRestore?: boolean): Observable<boolean> {
        return this.dataService
            .sendDELETE(
                TARGET_GROUPS_API.DELETE_TARGET_GROUP.replace(
                    "{targetGroupID}", targetGroupID)
                    .replace("{doRestore}", (doRestore ? "restore" : "delete"))
            )
            .pipe(
                map(
                    (res: HttpResponse<any>) => {
                        if (res.status == HTTP_RESPONSE_STATUS.OK) {
                            // Extract current state of the observable
                            const targetGroups: TargetGroups[] = this.targetGroupSubject.value;

                            // find index of the currently deleted target group from
                            // target groups array
                            const targetGroupsIndexToDelete = _.findIndex(targetGroups, {
                                _id: targetGroupID,
                            });

                            if (targetGroupsIndexToDelete != -1) {
                                targetGroups[targetGroupsIndexToDelete].isDeleted = !doRestore;
                                this.targetGroupSubject.next(_.cloneDeep(targetGroups));
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

    rebroadcastTargetGroupData() {
        this.targetGroupSubject.next(_.cloneDeep(this.targetGroupSubject.value))
    }
}
