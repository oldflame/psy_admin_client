import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnChanges {
  @Input("users") users: User[];
  @Output("userDetailsViewed") userDetailsViewed = new EventEmitter();
  showUsersLoader = true;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    console.log('Users', this.users);
    if (changes.users && changes.users.currentValue != null) {
      this.showUsersLoader = false;
    }
  }

  ngOnInit() {}

  viewUserDetailsClicked(user: User) {
    this.userDetailsViewed.emit({ user });
  }
}
