import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {TOAST_TYPE, ToastService} from "../../services/toast.service";
import {TargetGroupsService} from "../../services/target-groups.service";
import {EMPTY, Observable} from "rxjs";
import {FormControl} from "@angular/forms";
import {map, switchMap} from "rxjs/operators";
import {HttpErrorResponse} from "@angular/common/http";
import {TargetGroups} from "../../models/target-groups";
import * as _ from "lodash";
import {ActionConfirmDialogComponent} from "../general/dialogs/action-confirm-dialog/action-confirm-dialog.component";
import {AddTargetGroupsComponent} from "../general/dialogs/add-target-groups/add-target-groups.component";

@Component({
  selector: 'target-groups',
  templateUrl: './target-groups.component.html',
  styleUrls: ['./target-groups.component.scss']
})
export class TargetGroupsComponent implements OnInit {

  targetGroups$: Observable<TargetGroups[]>;
  dialogRef;
  deletedTargetGroupsToggle = new FormControl(false);
  showAllTargetGroups = false;

  searchTerms: string[] = [];

  constructor(
      private targetGroupsService: TargetGroupsService,
      private dialog: MatDialog,
      private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.targetGroups$ = this.targetGroupsService.targetGroups$.pipe(
        map((targetGroups: TargetGroups[]) => {
          if (targetGroups && targetGroups.length > 0) {
            if (!this.showAllTargetGroups) {
              targetGroups = targetGroups.filter((targetGroup) => !targetGroup.isDeleted)
            }
            targetGroups = _.sortBy(targetGroups, "name");
          }
          return targetGroups;
        })
    );
    this.targetGroupsService.getTargetGroups().subscribe(
        () => {},
        (err: HttpErrorResponse) => {
          this.toastService.showToast(err.error.msg, TOAST_TYPE.DANGER);
        }
    );
    this.deletedTargetGroupsToggle.valueChanges.subscribe((value) => {
      this.showAllTargetGroups = value;
      this.targetGroupsService.rebroadcastTargetGroupData();
    });
  }

    searchTextChanged(eventArgs) {
      this.searchTerms = eventArgs.searchTerms;
      console.log("Search for", this.searchTerms);
    }

    addTargetGroup() {
      this.dialogRef = this.dialog.open(AddTargetGroupsComponent, {
        width: "600px",
        closeOnNavigation: true
      });
      this.dialogRef.afterClosed().pipe(switchMap((res: any) => {
        if (res) {
          return this.targetGroupsService.addNewTargetGroup(res);
        }
        return EMPTY;
      })).subscribe((res: boolean) => {
            if (res) {
              this.toastService.showToast("Target Group added successfully!", TOAST_TYPE.SUCCESS);
            } else {
              this.toastService.showToast("Failed to add Target Group. Try again!", TOAST_TYPE.DANGER);
            }
          },
          (err: HttpErrorResponse) => {
            this.toastService.showToast(err.error.msg, TOAST_TYPE.DANGER);
          }
      );
    }

    deleteTargetGroup(eventArgs: any) {
      this.dialogRef = this.dialog.open(ActionConfirmDialogComponent, {
        width: "450px",
        closeOnNavigation: true,
        data: {
          title: "Confirm Delete Target Group",
          messageLine1: "Are you sure you want to delete this Target Group?",
          messageLine2: "This cannot be undone.",
          successText: "Delete",
        },
      });

      this.dialogRef
          .afterClosed()
          .pipe(
              switchMap((res: boolean) => {
                if (res) {
                  return this.targetGroupsService.deleteTargetGroup(
                      eventArgs.targetGroupID
                  );
                }
                return EMPTY;
              })
          )
          .subscribe((serverRes: boolean) => {
                if (serverRes) {
                  this.toastService.showToast(
                      "Target Group Deleted Successfully!",
                      TOAST_TYPE.SUCCESS
                  );
                } else {
                  this.toastService.showToast(
                      "Failed to delete Target Group. Try again!",
                      TOAST_TYPE.DANGER
                  );
                }
              },
              (err: HttpErrorResponse) => {
                this.toastService.showToast(err.error.msg, TOAST_TYPE.DANGER);
              }
          );
    }

    restoreTargetGroup(eventArgs: any) {
      this.dialogRef = this.dialog.open(ActionConfirmDialogComponent, {
        width: "450px",
        closeOnNavigation: true,
        data: {
          title: "Confirm Restore Target Group",
          messageLine1: "Are you sure you want to restore the Target Group?",
          successText: "Restore",
        },
      });
      this.dialogRef.afterClosed().pipe(switchMap((res: boolean) => {
        if (res) {
          return this.targetGroupsService.deleteTargetGroup(eventArgs.targetGroupID, true);
        }
        return EMPTY;
      }))
          .subscribe((serverRes: boolean) => {
                if (serverRes) {
                  this.toastService.showToast(
                      "Target Group restored Successfully!",
                      TOAST_TYPE.SUCCESS
                  );
                } else {
                  this.toastService.showToast(
                      "Failed to restore Target Group. Try again!",
                      TOAST_TYPE.DANGER
                  );
                }
              },
              (err: HttpErrorResponse) => {
                this.toastService.showToast(err.error.msg, TOAST_TYPE.DANGER);
              }
          );
    }

    viewTargetGroup(eventArgs: any) {
      console.log("view target group");
    }
}
