import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'action-confirm-dialog',
  templateUrl: './action-confirm-dialog.component.html',
  styleUrls: ['./action-confirm-dialog.component.scss']
})
export class ActionConfirmDialogComponent implements OnInit {

  title: string;
  icon: string;
  messageLine1: string;
  messageLine2: string;
  successText: string;
  cancelText: string;

  constructor(private dialogRef: MatDialogRef<ActionConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private dialogData: any) { }

  ngOnInit() {
    this.title = this.dialogData.title || 'Confirm Action';
    this.icon = this.dialogData.icon || '../../../../assets/img/essentials/warning.svg';
    this.messageLine1 = this.dialogData.messageLine1 || 'Are you sure you want to continue ?';
    this.messageLine2 = this.dialogData.messageLine2;
    this.successText = this.dialogData.successText || 'Continue';
    this.cancelText = this.dialogData.cancelText || 'Cancel';
  }

}
