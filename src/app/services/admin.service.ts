import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { Admin } from "../models/admin";
import { DataService } from "./data.service";
import { AUTH_API, HTTP_RESPONSE_STATUS } from "../constants";
import { HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
import { RegisterAdminParams } from "../models/request-params";

@Injectable({
  providedIn: "root",
})
export class AdminService {
  
}
