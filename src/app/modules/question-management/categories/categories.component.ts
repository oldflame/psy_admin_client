import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { switchMap } from "rxjs/operators";
import { QuestionCategory } from "src/app/models/question-category";
import { EMPTY } from "rxjs";
import { CategoryService } from 'src/app/services/category.service';
import { AddQuestionCategoryComponent } from '../../general/dialogs/add-question-category/add-question-category.component';

@Component({
  selector: "categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.scss"],
})
export class CategoriesComponent implements OnInit {
  dialogRef;
  questionCategories$;
  constructor(private dialog: MatDialog, private categoryService: CategoryService) {}

  ngOnInit(): void {}

  showAddCategoryDialog() {
    this.dialogRef = this.dialog.open(AddQuestionCategoryComponent, {
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
