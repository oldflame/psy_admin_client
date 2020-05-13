import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { CategoryService } from "src/app/services/category.service";

@Component({
  selector: "add-question",
  templateUrl: "./add-question.component.html",
  styleUrls: ["./add-question.component.scss"],
})
export class AddQuestionComponent implements OnInit {
  questionCategories$;
  addQuestionCategoryControl: FormGroup = new FormGroup({
    questionName: new FormControl("", [Validators.required]),
    description: new FormControl(""),
    questionCategory: new FormControl("", [Validators.required]),
  });
  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getAllQuestionCategories().subscribe();
    this.questionCategories$ = this.categoryService.categories$;
  }
}
