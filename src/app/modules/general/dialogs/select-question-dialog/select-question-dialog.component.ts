import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { QuestionsService } from "src/app/services/questions.service";
import { CategoryService } from "src/app/services/category.service";
import { QuestionCategory } from "src/app/models/question-category";
import { Question } from "src/app/models/question";
import { Observable, EMPTY } from "rxjs";
import { switchMap } from "rxjs/operators";

@Component({
  selector: "select-question-dialog",
  templateUrl: "./select-question-dialog.component.html",
  styleUrls: ["./select-question-dialog.component.scss"],
})
export class SelectQuestionDialogComponent implements OnInit {
  questions: Question[];
  questionCategories$: Observable<QuestionCategory[]>;
  selectedQuestionCategory: any;

  updateQuestionControl: FormGroup = new FormGroup({
    category: new FormControl("", [Validators.required]),
    order: new FormControl("", [Validators.required]),
  });
  constructor(
    private questionService: QuestionsService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.questionCategories$ = this.categoryService.categories$;
    this.categoryService.getAllQuestionCategories().subscribe();
    this.updateQuestionControl
      .get("category")
      .valueChanges.pipe(
        switchMap((category) => {
          if (category) {
            return this.questionService.getQuestionsForCategory(category);
          }
          return EMPTY;
        })
      )
      .subscribe((questions) => {
        this.questions = questions;
      });
  }
}
