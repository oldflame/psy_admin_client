import { Component, OnInit, Inject } from '@angular/core';
import { Image } from '../../../../models/image';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'image-details',
  templateUrl: './image-details.component.html',
  styleUrls: ['./image-details.component.scss']
})
export class ImageDetailsComponent implements OnInit {
  image: Image;

  constructor(private dialogRef: MatDialogRef<ImageDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) private dialogData: any) { }

  ngOnInit(): void {
    this.image = this.dialogData.image;
  }

}
