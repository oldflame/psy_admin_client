import { Injectable } from "@angular/core";

declare const $: any;

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
  messageShown = "";
  icon = {
    success: "check",
    info: "add_alert",
    warning: "warning",
    danger: "error_outline",
  };
  constructor() {}
  showToast(message: string, type: TOAST_TYPE, from?: string, align?: string) {
    if (message != "" && message != this.messageShown) {
      // Prevent duplicate notifications
      $.notify(
        {
          icon: this.icon[type],
          message: message,
        },
        {
          type: type,
          timer: 3000,
          delay: 3000,
          placement: {
            from: from || "top",
            align: align || "right",
          },
          onShow: () => {
            this.messageShown = message;
          },
          onClosed: () => {
            this.messageShown = "";
          },
          template:
            `<div data-notify="container" class="col-9 col-sm-6 col-md-4 col-lg-3 alert alert-{0} alert-with-icon" role="alert">
                    <button mat-raised-button type="button" aria-hidden="true" class="close" data-notify="dismiss">
                      <i class="material-icons">close</i>
                    </button>
                    <i class="material-icons" data-notify="icon">` +
            this.icon[type] +
            `</i>
                    <span data-notify="title">{1}</span>
                    <span data-notify="message">{2}</span>
                    <div class="progress" data-notify="progressbar">
                        <div class="progress-bar progress-bar-{0}"
                              role="progressbar"
                              aria-valuenow="0"
                              aria-valuemin="0"
                              aria-valuemax="100"
                              style="width: 0%;">
                          </div>
                </div>
                      <a href="{3}" target="{4}" data-notify="url"></a>
                  </div>`,
        }
      );
    }
  }
}
