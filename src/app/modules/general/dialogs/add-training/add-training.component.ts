import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import * as moment from "moment";
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from "@angular/material/core";

export const MY_FORMATS = {
  parse: {
    dateInput: "MM/DD/YYYY",
  },
  display: {
    dateInput: "MM/DD/YYYY",
    monthYearLabel: "MMM YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "MMMM YYYY",
  },
};

@Component({
  selector: "add-training",
  templateUrl: "./add-training.component.html",
  styleUrls: ["./add-training.component.scss"],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class AddTrainingComponent implements OnInit {
  moment = moment;
  startDate = moment();

  constructor() {}
  addTrainingControl: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required]),
    description: new FormControl(""),
    keywords: new FormControl("", [Validators.required]),
    scheduleFor: new FormControl("", [Validators.required]),
  });
  ngOnInit(): void {}
  isMobileDisplay() {
    return window.screen.width <= 576;
  }
}
