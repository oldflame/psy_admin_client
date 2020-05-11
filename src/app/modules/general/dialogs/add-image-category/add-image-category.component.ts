import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'add-image-category',
  templateUrl: './add-image-category.component.html',
  styleUrls: ['./add-image-category.component.scss']
})
export class AddImageCategoryComponent implements OnInit {
  imageCategoryForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [])
  })

  constructor() { }

  ngOnInit(): void {
  }

}
