import { Component, OnInit } from "@angular/core";
import { OverviewService } from "../../services/overview.service";
import { HttpErrorResponse } from "@angular/common/http";
import { ToastService, TOAST_TYPE } from "../../services/toast.service";

@Component({
  selector: "overview",
  templateUrl: "./overview.component.html",
  styleUrls: ["./overview.component.scss"],
})
export class OverviewComponent implements OnInit {
  entityCounts: any = {};

  constructor(
    private overviewService: OverviewService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.overviewService.getEntityCounts().subscribe(
      (res) => {
        this.entityCounts = res;
      },
      (err: HttpErrorResponse) => {
        this.toastService.showToast(err.error.msg, TOAST_TYPE.DANGER);
      }
    );
  }
}
