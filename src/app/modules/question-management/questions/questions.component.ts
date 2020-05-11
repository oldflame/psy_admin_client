import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddQuestionComponent } from '../../general/dialogs/add-question/add-question.component';
import { switchMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { QuestionsService } from 'src/app/services/questions.service';

@Component({
  selector: 'questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
  dialogRef;

  constructor(private dialog: MatDialog,private questionService: QuestionsService) { }

  ngOnInit(): void {
  }

  showAddQuestionDialog() {
    this.dialogRef = this.dialog.open(AddQuestionComponent, {
      width: "800px",
      closeOnNavigation: true,
    });

    this.dialogRef
      .afterClosed()
      .pipe(
        switchMap((res: any) => {
          if (res) {
            return this.questionService.addQuestion(res);
          }
          return EMPTY;
        })
      )
      .subscribe();
  }
}
