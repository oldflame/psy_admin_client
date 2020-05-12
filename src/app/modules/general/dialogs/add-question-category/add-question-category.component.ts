import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'add-question-category',
  templateUrl: './add-question-category.component.html',
  styleUrls: ['./add-question-category.component.scss']
})
export class AddQuestionCategoryComponent implements OnInit {

  constructor() { }
  addQuestionControl: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required]),
    description: new FormControl(""),
    responseType: new FormControl("", [Validators.required]),
    startLabel: new FormControl(""),
    endLabel: new FormControl(""),
  })
  ngOnInit(): void {
  }

}
