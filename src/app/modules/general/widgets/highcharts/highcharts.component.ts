import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';

@Component({
  selector: 'highcharts',
  templateUrl: './highcharts.component.html',
  styleUrls: ['./highcharts.component.scss']
})
export class HighchartsComponent {
  @Input() Highcharts: any;
  @Input() constructorType: string;
  @Input() callbackFunction: any;
  @Output() updateChange = new EventEmitter(true);
  @Input()
  set options(val) {
    this.optionsValue = val;
    this.updateOrCreateChart();
  }
  @Input() set update(val) {
    if (val) {
      this.updateOrCreateChart();
      this.updateChange.emit(false); // clear the flag after update
    }
  }
  chart: any;
  optionsValue: any;
  updateValue = false;

  constructor(private el: ElementRef) { };

  updateOrCreateChart = function () {
    if (this.chart && this.chart.update) {
      this.chart.update(this.optionsValue);
    } else {
      this.chart = this.Highcharts[this.constructorType || 'chart'](
        this.el.nativeElement,
        this.optionsValue,
        this.callbackFunction || null
      );
      this.optionsValue.series = this.chart.userOptions.series;
    }
  }
}
