import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit {

  constructor() { }
  addQuestionCategoryControl: FormGroup = new FormGroup({
    categoryName: new FormControl("", [Validators.required]),
    description: new FormControl(""),
    questionCategory: new FormControl("", [Validators.required])
  })
  ngOnInit(): void {
  }

}
