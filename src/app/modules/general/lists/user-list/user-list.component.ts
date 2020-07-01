import { User } from './../../../../models/user';

import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit,OnChanges {
  @Input("users") users: User[];
  @Output("userViewed") userViewed = new EventEmitter();

  showUsersLoader = true;
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.users && changes.users.currentValue != null) {
      this.showUsersLoader = false;
    }
  }

  ngOnInit(): void {
  }


  viewUserDetails(eventArgs: any, user: User) {
    this.userViewed.emit({ user });
    console.log(user.email)
  }

}
