import { Component, OnInit } from '@angular/core';
import { UsersManagementService } from 'src/app/services/users-management.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { ToastService, TOAST_TYPE } from 'src/app/services/toast.service';

@Component({
  selector: 'users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.scss']
})
export class UsersManagementComponent implements OnInit {
  users$: Observable<User[]>;

  constructor(private usersManagementService: UsersManagementService, private toastService: ToastService) { }

  ngOnInit(): void {
    this.users$ = this.usersManagementService.users$;
    this.usersManagementService.getUsersList().subscribe(() => { }, (err) => {
      this.toastService.showToast(err.error.msg, TOAST_TYPE.DANGER);
    })
  }

  viewUser(eventArgs) {
    console.log('Viewing User', eventArgs)
  }

  toggleUserActive(eventArgs) {
    console.log('Toggling user active', eventArgs);
  }

}
