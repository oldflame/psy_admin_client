import { Component, OnInit } from "@angular/core";
import { UsersManagementService } from "src/app/services/users-management.service";
import { ActivatedRoute } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { EMPTY } from "rxjs";
import { ToastService, TOAST_TYPE } from "src/app/services/toast.service";
import { HttpErrorResponse } from "@angular/common/http";
import * as Highcharts from "highcharts";
import * as moment from "moment";
import * as _ from "lodash";

declare let require: any;
require("../../../../assets/js/core/no-data-to-display")(Highcharts);

@Component({
  selector: "trends",
  templateUrl: "./trends.component.html",
  styleUrls: ["./trends.component.scss"],
})
export class TrendsComponent implements OnInit {
  Highcharts = Highcharts;
  timeChartOptions;
  accuracyChartOptions;
  showChartLoader = true;

  constructor(
    private usersManagementService: UsersManagementService,
    private route: ActivatedRoute,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        switchMap((params) => {
          if (params && params.q) {
            return this.usersManagementService.getImageResponseTrends(params.q);
          }
          return EMPTY;
        })
      )
      .subscribe(
        (res) => {
          console.log("Trends", res);
          if (res) {
            this.formatSeriesData(res);
          }
        },
        (err: HttpErrorResponse) => {
          this.toastService.showToast(err.error.msg, TOAST_TYPE.DANGER);
        }
      );
  }

  formatSeriesData(trendsData) {
    const timePoints = [];
    const accuracyPoints = [];
    trendsData.forEach(dataPt => {
      timePoints.push(dataPt.meanResponseTime);
      accuracyPoints.push(dataPt.accuracy);
    });

    this.timeChartOptions = this.drawLineChart([{name: 'Response Time', data: timePoints}], 0, null);
    this.accuracyChartOptions = this.drawLineChart([{name: 'Accuracy', data: accuracyPoints}], 0, 100);
    this.showChartLoader = false;
  }

  drawLineChart(seriesData, min, max) {
    const self = this;
    return {
      chart: {
        type: "line",
      },
      title: {
        text: "",
      },
      xAxis: {
        title: {
          text: "Training Sessions",
        },
        labels: {
          formatter: function() {
            return this.pos + 1
          }
        }
      },
      yAxis: {
        title: {
          text: "Average Response time in ms",
        },
        min,
        max
      },
      legend: {
        enabled: false,
      },
      tooltip: {
        formatter: function() {
          console.log(this);
          return "<b>" + this.series.name + "</b><br>" + parseInt(this.y, 10) + '%';
        },
      },
      plotOptions: {
        area: {
          fillColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1,
            },
          },
          marker: {
            radius: 2,
          },

          lineWidth: 1,
          states: {
            hover: {
              lineWidth: 1,
            },
          },
          threshold: null,
        },
      },
      credits: {
        enabled: false,
      },
      series: seriesData,
      exporting: { enabled: true },
    };
  }
}
