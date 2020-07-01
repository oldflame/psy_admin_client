import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { USER_API, HTTP_RESPONSE_STATUS } from './../constants';
import { DataService } from './data.service';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
  private userDetailsSubject = new BehaviorSubject(null);
  users$: Observable<User[]> = this.userDetailsSubject.asObservable();

  constructor(private dataService: DataService) { }

  getAllUserDetails(): Observable<boolean> {
    return this.dataService
      .sendGET(USER_API.GET_ALL_USERS)
      .pipe(
        map(
          (res: HttpResponse<any>) => {
            if (res.status == HTTP_RESPONSE_STATUS.OK) {
              this.userDetailsSubject.next(res.body);
            } else {
              this.userDetailsSubject.next([]);
            }
            return res.status == HTTP_RESPONSE_STATUS.OK;
          },
          catchError((err: HttpErrorResponse) => {
            this.userDetailsSubject.next([]);
            return of(false);
          })
        )
      );
  }

}
