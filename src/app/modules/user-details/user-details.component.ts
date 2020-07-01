import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserDetailsService } from './../../services/user-details.service';
import { Observable, from } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { title } from 'process';
import {MatDialog} from "@angular/material/dialog";
import {User} from '../../models/user'
import {TOAST_TYPE, ToastService} from "../../services/toast.service";
import { FromUtcPipe } from 'ngx-moment';
import * as _ from "lodash";

@Component({
  selector: 'user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  users$ : Observable<User[]>;
  dialogRef;
  searchTerms: string[] = [];

  constructor(private userDetailsService: UserDetailsService,
    private dialog: MatDialog,
    private toastService: ToastService, private router: Router){}

  ngOnInit(): void {

    this.users$ = this.userDetailsService.users$.pipe(
      map((users: User[]) => {
        if (users && users.length > 0) {
          users = _.sortBy(users, "firstName");
        }
        return users;
      })
    );
    this.userDetailsService.getAllUserDetails().subscribe(
        () => {},
        (err: HttpErrorResponse) => {
          this.toastService.showToast(err.error.msg, TOAST_TYPE.DANGER);
        }
    );
  }

  searchTextChanged(eventArgs) {
    this.searchTerms = eventArgs.searchTerms;
  }

  viewUser(eventArgs: any) {
    console.log(eventArgs.user._id);
    this.router.navigate(['/user/'],{queryParams: {id: eventArgs.user._id}})
  }

}
