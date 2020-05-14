import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTrainingComponent } from '../../general/dialogs/add-training/add-training.component';
import { switchMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { TrainingService } from 'src/app/services/training.service';

@Component({
  selector: 'trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.scss']
})
export class TrainingsComponent implements OnInit {

  dialogRef;

  constructor(private dialog: MatDialog, private trainingService: TrainingService) { }

  ngOnInit(): void {
  }

  showAddTrainingDialog() {
    this.dialogRef = this.dialog.open(AddTrainingComponent, {
      width: "800px",
      closeOnNavigation: true,
    });

    this.dialogRef
      .afterClosed()
      .pipe(
        switchMap((res: any) => {
          if (res) {
            return this.trainingService.addTraining(res);
          }
          return EMPTY;
        })
      )
      .subscribe();
  }
}
