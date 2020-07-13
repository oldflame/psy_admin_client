import { Component, OnInit } from '@angular/core';
import { UsersManagementService } from 'src/app/services/users-management.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { ToastService, TOAST_TYPE } from 'src/app/services/toast.service';
import { Router } from '@angular/router';
import { TrainingSession } from 'src/app/models/training-session';

@Component({
  selector: 'users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.scss']
})
export class UsersManagementComponent implements OnInit {
  users$: Observable<User[]>;

  constructor(private usersManagementService: UsersManagementService, private toastService: ToastService, private router: Router) { }

  ngOnInit(): void {
    this.users$ = this.usersManagementService.users$;
    this.usersManagementService.getUsersList().subscribe(() => { }, (err) => {
      this.toastService.showToast(err.error.msg, TOAST_TYPE.DANGER);
    })
  }

  viewUserDetails(eventArgs) {
    console.log('Viewing User Details', eventArgs);
    this.router.navigate(['/users/trainingdetails'], {queryParams: {q: eventArgs.user._id}});
  }

  toggleUserActive(eventArgs) {
    console.log('Toggling user active', eventArgs);
  }

  exportTrainingData() {
    console.log("Exporting training data");
    this.usersManagementService.getAllTrainingSessions()
    .subscribe((trainingSessions: TrainingSession[]) => { 
      console.log(trainingSessions);
    }, (err) => {
      this.toastService.showToast(err.error.msg, TOAST_TYPE.DANGER);
    })
  }
}
