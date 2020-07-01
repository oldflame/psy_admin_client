import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnChanges {
  @Input("users") users: User[];

  @Output("userViewed") userViewed = new EventEmitter();
  @Output("userActiveToggled") userActiveToggled = new EventEmitter();

  showUsersLoader = true;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    console.log('Users', this.users);
    if (changes.users && changes.users.currentValue != null) {
      this.showUsersLoader = false;
    }
  }

  ngOnInit() {}

  viewUserClicked(user: User) {
    this.userViewed.emit({ user });
  }

  toggleActivityClicked(userId: string, $event) {
    this.userActiveToggled.emit({userId});
    $event.stopPropagation();
  }
}
