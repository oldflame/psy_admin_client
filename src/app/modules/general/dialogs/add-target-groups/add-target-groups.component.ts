import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LocationsService} from "../../../../services/locations.service";
import {TrainingService} from "../../../../services/training.service";

@Component({
  selector: 'add-target-groups',
  templateUrl: './add-target-groups.component.html',
  styleUrls: ['./add-target-groups.component.scss']
})
export class AddTargetGroupsComponent implements OnInit {
  locations$;
  trainings$;
  addTargetGroupsForm: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required]),
    description: new FormControl(""),
    keywords: new FormControl(""),
    location: new FormControl("", [Validators.required]),
    training: new FormControl("", [Validators.required]),
  });

  constructor(private locationService: LocationsService, private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.locationService.getLocations().subscribe();
    this.locations$ = this.locationService.locations$;
    this.trainingService.getAllTrainings().subscribe();
    this.trainings$ = this.trainingService.trainings$;
  }

}
