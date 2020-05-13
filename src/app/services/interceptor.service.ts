import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { APP_SERVER_OPTIONS } from "../config";
import { SecureStorageService } from './secure-storage.service';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/operators";
import { AuthService } from './auth.service';

@Injectable({
  providedIn: "root",
})
export class InterceptorService implements HttpInterceptor {
  constructor(
    private secureStorageService: SecureStorageService,
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const serverURL = APP_SERVER_OPTIONS.host + ":" + APP_SERVER_OPTIONS.port;

    const headersToSet = {};

    if (req.url.indexOf("/account") !== -1) {
      headersToSet[
        "Authorization"
      ] = `Bearer ${this.secureStorageService.getValue("at")}`;
    }
    req = req.clone({
      url: serverURL + req.url,
      setHeaders: headersToSet,
    });

    return next.handle(req).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status == 401) {
            this.authService.logout();
            this.router.navigate(["/login"]);
          }
        }
        return throwError(err);
      })
    );
  }
}
