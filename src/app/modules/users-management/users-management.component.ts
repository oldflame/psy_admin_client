import { Component, OnInit } from '@angular/core';
import { UsersManagementService } from 'src/app/services/users-management.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { ToastService, TOAST_TYPE } from 'src/app/services/toast.service';
import { Router } from '@angular/router';
import { TrainingSession } from 'src/app/models/training-session';
import { NullTemplateVisitor } from '@angular/compiler';

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

  flatten = (function (isArray, wrapped) {
    return function (table) {
        return reduce("", {}, table);
    };

    function reduce(path, accumulator, table) {
        if (isArray(table)) {
            var length = table.length;

            if (length) {
                var index = 0;

                while (index < length) {
                    var property = path + "[" + index + "]", item = table[index++];
                    if (wrapped(item) !== item) accumulator[property] = item;
                    else reduce(property, accumulator, item);
                }
            } else accumulator[path] = table;
        } else {
            var empty = true;

            if (path) {
                for (var property in table) {
                    var item = table[property], property = path + "." + property, empty = false;
                    if (wrapped(item) !== item) accumulator[property] = item;
                    else reduce(property, accumulator, item);
                }
            } else {
                for (var property in table) {
                    var item = table[property], empty = false;
                    if (wrapped(item) !== item) accumulator[property] = item;
                    else reduce(property, accumulator, item);
                }
            }

            if (empty) accumulator[path] = table;
        }

        return accumulator;
    }
}(Array.isArray, Object));

  exportTrainingData() {
    console.log("Exporting training data");
    this.usersManagementService.getAllTrainingSessions()
    .subscribe((trainingSessions: TrainingSession[]) => { 
      console.log(trainingSessions);
      let items = trainingSessions;
      const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
      const header = Object.keys(items[0]);
      let csv = items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
      csv.unshift(header.join(','));
      let csv_data = csv.join('\r\n');

      // this.training.questionData.forEach(
      //     (config) => (config.actionType = TRAINING_ACTION_TYPE.QUESTION)
      //   );

      let data_csv = this.flatten(items);

      //Download the file as CSV
      var downloadLink = document.createElement("a");
      var blob = new Blob(["\ufeff", data_csv]);
      var url = URL.createObjectURL(blob);
      downloadLink.href = url;
      downloadLink.download = "TrainingData.csv";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }, (err) => {
      this.toastService.showToast(err.error.msg, TOAST_TYPE.DANGER);
    })
  }
}
