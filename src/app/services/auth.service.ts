import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of, throwError } from "rxjs";
import { Admin } from "../models/admin";
import { DataService } from "./data.service";
import { AUTH_API, HTTP_RESPONSE_STATUS } from "../constants";
import { map, catchError } from "rxjs/operators";
import { HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { RegisterAdminParams } from "../models/request-params";
import { SecureStorageService } from "./secure-storage.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private authSubject = new BehaviorSubject(null);
  auth$: Observable<Admin> = this.authSubject.asObservable();

  constructor(
    private dataService: DataService,
    private secureStorageService: SecureStorageService,
    private router: Router
  ) {
    if (this.getAdminData()) {
      this.authSubject.next(this.getAdminData());
    }
  }

  login(email: string, password: string): Observable<boolean> {
    const reqBody = { email, password };

    return this.dataService.sendPOST(AUTH_API.LOGIN, reqBody).pipe(
      map(
        (res: HttpResponse<any>) => {
          if (res.status == HTTP_RESPONSE_STATUS.OK) {
            this.authSubject.next(res.body.user);
            this.secureStorageService.setValue("at", res.body.token);
            this.secureStorageService.setValue("ud", res.body.user);
          } else {
            this.authSubject.next(null);
          }
          return res.status == HTTP_RESPONSE_STATUS.OK;
        },
        catchError((err: HttpErrorResponse) => {
          this.authSubject.next(null);
          return throwError(err.error);
        })
      )
    );
  }

  register(requestBody: RegisterAdminParams): Observable<boolean> {
    return this.dataService.sendPOST(AUTH_API.REGISTER, requestBody).pipe(
      map(
        (res: HttpResponse<any>) => {
          return res.status == HTTP_RESPONSE_STATUS.OK;
        },
        catchError((err: HttpErrorResponse) => {
          return throwError(err.error);
        })
      )
    );
  }

  logout(): boolean {
    this.secureStorageService.clearStorage();
    this.router.navigate(["/login"]);
    return true;
  }

  getAdminData(): Admin {
    return this.secureStorageService.getValue("ud") as Admin;
  }

  isAuthenticated(): boolean {
    return this.secureStorageService.getValue("at") !== "";
  }
}
