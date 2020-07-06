import { Router } from '@angular/router';
import { RACE } from './../../../constants';
import { ETHNICITY } from 'src/app/constants';
import { User } from 'src/app/models/user';
import { TrainingSession } from './../../../models/training-session';
import { HttpErrorResponse } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { ToastService, TOAST_TYPE } from './../../../services/toast.service';
import { UsersManagementService } from './../../../services/users-management.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'trainingdetails',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  user: User;
  userId: string;
  trainingSession: TrainingSession[];
  dialogRef;
  userConfigurationForUI;
  private paginator: MatPaginator;
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.userConfigurationForUI.paginator = this.paginator;
  }

  trainingConfigurationDisplayColumns = [
    "trainingName",
    "createdAt",
    "updatedAt"
  ];
  constructor(private dialog: MatDialog,
    private route: ActivatedRoute,
    private userService: UsersManagementService,
    private toastService: ToastService,private router: Router) {
    }

  ngOnInit(): void {
    this.getUserData();
    this.getTrainingSessionData();
  }

  getUserData(){
    this.route.queryParams
    .pipe(
      switchMap((params: any) => {
        if (params && params.q) {
          return this.userService.getUserById(params.q);
        }
        return EMPTY;
      })
    )
    .subscribe((user: User) => {
      // tslint:disable-next-line:radix
      if(parseInt(user.ethnicity)<0){
        user.ethnicity = "N/A"
      }else{
        user.ethnicity = ETHNICITY[user.ethnicity]
      }
      // tslint:disable-next-line:radix
      if(parseInt(user.race)<0){
        user.race = "N/A"
      }else{
        user.race = RACE[user.race]
      }
      this.user = user
    },
    (err: HttpErrorResponse) => {
      this.toastService.showToast(err.error.msg, TOAST_TYPE.DANGER);
    });
  }

  viewUserGraphs(user) {
    console.log('Viewing User Treads', user);
    this.router.navigate(['/users/trends'], {queryParams: {q: user._id}});
  }

  getTrainingSessionData(){
    this.route.queryParams
    .pipe(
      switchMap((params: any) => {
        if (params && params.q) {
          return this.userService.getUserTrainings(params.q);
        }
        return EMPTY;
      })
    )
    .subscribe((trainingSession: TrainingSession[]) => {
      this.trainingSession = trainingSession
      this.userConfigurationForUI = new MatTableDataSource(this.trainingSession);
  },
  (err: HttpErrorResponse) => {
    this.toastService.showToast(err.error.msg, TOAST_TYPE.DANGER);
  });
}
}