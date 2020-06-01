import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ENTER, COMMA } from "@angular/cdk/keycodes";
import { MatChipInputEvent } from "@angular/material/chips";
import {
  IMAGE_INTENSITY_OPTIONS,
  IMAGE_TYPE_OPTIONS,
} from "../../../constants";
import { ImageManagementService } from "../../../services/image-management.service";
import { Observable, EMPTY } from "rxjs";
import { Category } from "src/app/models/category";
import { EditImageDialogComponent } from "../../general/dialogs/edit-image-dialog/edit-image-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { switchMap } from "rxjs/operators";
import * as _ from "lodash";
import { AddImageParams } from "src/app/models/request-params";
import { ToastService, TOAST_TYPE } from "../../../services/toast.service";
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "add-image",
  templateUrl: "./add-image.component.html",
  styleUrls: ["./add-image.component.scss"],
})
export class AddImageComponent implements OnInit {
  imageDataForm: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required]),
    description: new FormControl("", []),
    category: new FormControl("", [Validators.required]),
    intensity: new FormControl("", [Validators.required]),
    imageType: new FormControl("", [Validators.required]),
  });

  imagePreview = "../../../../assets/img/theme/image_placeholder.jpg";
  selectedImage;
  tags: string[] = [];
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  dialogRef;

  isImageUploading = false;

  imageIntensityOptions = IMAGE_INTENSITY_OPTIONS.filter((option) => option);
  imageTypeOptions = IMAGE_TYPE_OPTIONS.filter((option) => option);
  imageCategories$: Observable<Category[]>;

  constructor(
    private imageManagementService: ImageManagementService,
    private dialog: MatDialog,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.imageCategories$ = this.imageManagementService.imageCategories$;
    this.imageManagementService.getActiveImageCategories().subscribe(
      () => {},
      (err: HttpErrorResponse) => {
        this.toastService.showToast(err.error.msg, TOAST_TYPE.DANGER);
      }
    );
  }

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || "").trim()) {
      this.tags.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = "";
    }
  }

  removeTag(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  getSelectedFile(eventArgs: any) {
    if (eventArgs.content) {
      this.selectedImage = {
        content: eventArgs.content,
        fileName: eventArgs.name,
        fileType: eventArgs.type,
      };
      this.imagePreview = eventArgs.content;
    }
  }

  showImageEditorDialog() {
    this.dialogRef = this.dialog.open(EditImageDialogComponent, {
      width: "600px",
      closeOnNavigation: true,
      data: {
        selectedImage: this.selectedImage.content,
      },
    });

    this.dialogRef
      .afterClosed()
      .pipe(
        switchMap((croppedImage: any) => {
          if (croppedImage) {
            this.selectedImage.content = croppedImage.base64;
            this.imagePreview = this.selectedImage.content;
            return EMPTY;
          }
          return EMPTY;
        })
      )
      .subscribe();
  }

  submitImage() {
    if (!this.selectedImage || !this.selectedImage.content) {
      this.toastService.showToast(
        "Select an image to submit",
        TOAST_TYPE.DANGER
      );
      return;
    }

    this.selectedImage.content = this.selectedImage.content.split("base64,")[1];
    const addImageParams: AddImageParams = _.merge(
      this.imageDataForm.value,
      this.selectedImage,
      { tags: this.tags }
    );
    this.toastService.showToast(
      "Uploading image. Please wait...",
      TOAST_TYPE.INFO
    );

    this.isImageUploading = true;
    this.imageDataForm.disable();
    this.imageManagementService.addNewImage(addImageParams).subscribe(
      (res: boolean) => {
        this.isImageUploading = false;
        this.imageDataForm.enable();
        if (res) {
          this.toastService.showToast(
            "Image added successfully!",
            TOAST_TYPE.SUCCESS
          );

          this.router.navigate(["/image-management/images"]);
        }
      },
      (err: HttpErrorResponse) => {
        this.toastService.showToast(err.error.msg, TOAST_TYPE.DANGER);
      }
    );
  }
}
