import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { Category } from "src/app/models/category";
import { ImageManagementService } from "src/app/services/image-management.service";

@Component({
  selector: "select-image-dialog",
  templateUrl: "./select-image-dialog.component.html",
  styleUrls: ["./select-image-dialog.component.scss"],
})
export class SelectImageDialogComponent implements OnInit {
  imageCategories$: Observable<Category[]>;

  constructor(private imageManagementService: ImageManagementService) {}

  updateImageControl: FormGroup = new FormGroup({
    category: new FormControl("", [Validators.required]),
    type: new FormControl("", [Validators.required]),
    duration: new FormControl("", [Validators.required]),
    count: new FormControl("", [Validators.required]),
    order: new FormControl("", [Validators.required]),
  });
  ngOnInit(): void {
    this.imageCategories$ = this.imageManagementService.imageCategories$;
    this.imageManagementService.getAllImageCategories().subscribe();
  }
}
