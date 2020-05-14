import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Image } from '../../../../models/image';

@Component({
  selector: 'images-list',
  templateUrl: './images-list.component.html',
  styleUrls: ['./images-list.component.scss']
})
export class ImagesListComponent implements OnInit {
  @Input("images") images: Image[];

  @Output("imageDeleted") imageDeleted = new EventEmitter();
  @Output("imageViewed") imageViewed = new EventEmitter();

  showImagesLoader = true;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.images && changes.images.currentValue != null) {
      this.showImagesLoader = false;
    }
  }

  ngOnInit() {}

  deleteImageClicked($event: any, imageID: string) {
    this.imageDeleted.emit({ imageID });
    $event.stopPropagation();
  }

  viewImageClicked($event, image: Image) {
    this.imageViewed.emit({ image });
    $event.stopPropagation();
  }
}
