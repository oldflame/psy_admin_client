import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { User } from '../models/user';
import { DataService } from './data.service';
import { USERS_API, HTTP_RESPONSE_STATUS } from '../constants';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersManagementService {
  private usersSubject = new BehaviorSubject(null);
  users$: Observable<User[]> = this.usersSubject.asObservable();

  constructor(private dataService: DataService) { }

  getUsersList(): Observable<boolean> {
    return this.dataService.sendGET(USERS_API.GET_USERS_LIST).pipe(map((res: HttpResponse<any>) => {
      if (res.status === HTTP_RESPONSE_STATUS.OK) {
        this.usersSubject.next(res.body);
      } else {
        this.usersSubject.next([]);
      }
      return res.status === HTTP_RESPONSE_STATUS.OK;
    }), catchError((err: HttpErrorResponse) => {
      this.usersSubject.next([]);
      return throwError(err);
    }));
  }

  getImageResponseTrends(userId: string) {
    return this.dataService.sendGET(USERS_API.GET_IMAGE_RESPONSE_TRENDS.replace('{userId}', userId)).pipe(map((res: HttpResponse<any>) => {
      if (res.status === HTTP_RESPONSE_STATUS.OK) {
        return res.body
      } else {
        return null;
      }
    }), catchError((err: HttpErrorResponse) => {
      return throwError(err);
    }));
  }
}
