import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { Image } from '../../../../models/image';

@Component({
  selector: 'images-list',
  templateUrl: './images-list.component.html',
  styleUrls: ['./images-list.component.scss']
})
export class ImagesListComponent implements OnInit, OnChanges {
  @Input("images") images: Image[];

  @Output("imageDeleted") imageDeleted = new EventEmitter();
  @Output("imageRestored") imageRestored = new EventEmitter();
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

  restoreImageClicked($event: any, imageID: string) {
    this.imageRestored.emit({ imageID });
    $event.stopPropagation();
  }

  viewImageClicked($event, image: Image) {
    this.imageViewed.emit({ image });
    $event.stopPropagation();
  }
}
