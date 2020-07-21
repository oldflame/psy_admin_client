import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TrainingService } from "src/app/services/training.service";
import { switchMap } from "rxjs/operators";
import { EMPTY } from "rxjs";
import { UsersManagementService } from 'src/app/services/users-management.service';

@Component({
  selector: "training-results",
  templateUrl: "./training-results.component.html",
  styleUrls: ["./training-results.component.scss"],
})
export class TrainingResultsComponent implements OnInit {
  results;

  constructor(
    private route: ActivatedRoute,
    private userService: UsersManagementService,
  ) {}

  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        switchMap((params: any) => {
          if (params && params.q) {
            return this.userService.findTrainingSessionById(params.q);
          }
          return EMPTY;
        })
      )
      .subscribe((res: any) => {
        if (res) {
          this.results = res.responses;
        }
      });
  }
}
