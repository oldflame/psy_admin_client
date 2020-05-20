import { Component, OnInit } from '@angular/core';
import { ToastService, TOAST_TYPE } from '../../services/toast.service';

@Component({
  selector: 'gestures-test',
  templateUrl: './gestures-test.component.html',
  styleUrls: ['./gestures-test.component.scss']
})
export class GesturesTestComponent implements OnInit {
  isRejected = false;
  isNeutral = false;
  isAccepted = false;

  // imgURL = `https://picsum.photos/${ window.screen.width }/${ window.screen.height - 200 }`;
  imgURL = "https://storage.googleapis.com/download/storage/v1/b/pysch-changiz.appspot.com/o/images%2F5ebdd08d78a6b71d75d6b74d_5ebdd3ac7d35ae282b3a8acb_9166-4k-hd-desktop-wallpapers_28209.jpg?generation=1589498797396345&alt=media"
  constructor(private toastService: ToastService) { }

  ngOnInit(): void {
  }

  imageRejected() {
    this.toastService.showToast('Swipe Up', TOAST_TYPE.INFO);
    this.isRejected = true;
  }

  imageNeutral() {
    this.toastService.showToast('Swipe Right', TOAST_TYPE.INFO);
    this.isNeutral = true;
  }

  imageAccepted() {
    this.toastService.showToast('Swipe Down', TOAST_TYPE.INFO);
    this.isAccepted = true;
  }

  resetImage() {
    this.isAccepted = false;
    this.isRejected = false;
    this.isNeutral = false;
  }

  animationDone() {
    this.toastService.showToast('Animation Ended', TOAST_TYPE.INFO);
  }
}
