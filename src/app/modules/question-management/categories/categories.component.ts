import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { AddQuestionComponent } from "../../dialogues/add-question/add-question.component";
import { switchMap } from "rxjs/operators";
import { QuestionCategory } from "src/app/models/question-category";
import { EMPTY } from "rxjs";
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: "categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.scss"],
})
export class CategoriesComponent implements OnInit {
  dialogRef;

  constructor(private dialog: MatDialog, private categoryService: CategoryService) {}

  ngOnInit(): void {}

  showAddCategoryDialog() {
    this.dialogRef = this.dialog.open(AddQuestionComponent, {
      width: "800px",
      closeOnNavigation: true,
    });

    this.dialogRef
      .afterClosed()
      .pipe(
        switchMap((res: any) => {
          if (res) {
            return this.categoryService.addQuestionCategory(res);
          }
          return EMPTY;
        })
      )
      .subscribe();
  }
}
