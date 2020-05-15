import { Injectable } from "@angular/core";
import { MatSnackBar } from '@angular/material/snack-bar';

export enum TOAST_TYPE {
  SUCCESS = "success",
  INFO = "info",
  WARNING = "warning",
  DANGER = "danger",
}
@Injectable({
  providedIn: "root",
})
export class ToastService {
  durationInSeconds = 3;
  messageShown = "";
  icon = {
    success: "check",
    info: "add_alert",
    warning: "warning",
    danger: "error_outline"
  };
  constructor(private snackbar: MatSnackBar) {}
  showToast(message: string, type: TOAST_TYPE, from?: string, align?: string) {
    if (message != "" && message != this.messageShown) {  // Prevent duplicate notifications
     this.snackbar.open(message, null, {
       duration: this.durationInSeconds * 1000,
       verticalPosition: 'top',
       horizontalPosition: 'end',
       panelClass: [`bg-${type}`, 'text-white', 'font-weight-bold']
     });
    }
  }
}
