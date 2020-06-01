import { Component, OnInit } from "@angular/core";
import { LocationsService } from "../../services/locations.service";
import {EMPTY, Observable} from "rxjs";
import {map, switchMap} from "rxjs/operators";
import { Location } from "../../models/location";
import * as _ from "lodash";
import {MatDialog} from "@angular/material/dialog";
import {TOAST_TYPE, ToastService} from "../../services/toast.service";
import {AddLocationComponent} from "../general/dialogs/add-location/add-location.component";
import {ActionConfirmDialogComponent} from "../general/dialogs/action-confirm-dialog/action-confirm-dialog.component";
import {FormControl} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: "locations",
  templateUrl: "./locations.component.html",
  styleUrls: ["./locations.component.scss"],
})
export class LocationsComponent implements OnInit {
  locations$: Observable<Location[]>;
  dialogRef;
  deletedLocationsToggle = new FormControl(false);
  showAllLocations = false;

  searchTerms: string[] = [];

  constructor(
      private locationsService: LocationsService,
      private dialog: MatDialog,
      private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.locations$ = this.locationsService.locations$.pipe(
      map((locations: Location[]) => {
        if (locations && locations.length > 0) {
          if (!this.showAllLocations) {
            locations = locations.filter((location) => !location.isDeleted)
          }
          locations = _.sortBy(locations, "name");
        }
        return locations;
      })
    );
    this.locationsService.getLocations().subscribe(
        () => {},
        (err: HttpErrorResponse) => {
          this.toastService.showToast(err.error.msg, TOAST_TYPE.DANGER);
        }
    );
    this.deletedLocationsToggle.valueChanges.subscribe((value) => {
      this.showAllLocations = value;
      this.locationsService.rebroadcastLocationsData();
    });
  }

  searchTextChanged(eventArgs) {
    this.searchTerms = eventArgs.searchTerms;
  }

  deleteLocation(eventArgs: any) {
    this.dialogRef = this.dialog.open(ActionConfirmDialogComponent, {
      width: "450px",
      closeOnNavigation: true,
      data: {
        title: "Confirm Delete Location",
        messageLine1: "Are you sure you want to delete this location?",
        messageLine2: "This cannot be undone.",
        successText: "Delete",
      },
    });

    this.dialogRef
        .afterClosed()
        .pipe(
            switchMap((res: boolean) => {
              if (res) {
                return this.locationsService.deleteLocation(
                    eventArgs.locationID
                );
              }
              return EMPTY;
            })
        )
        .subscribe((serverRes: boolean) => {
          if (serverRes) {
            this.toastService.showToast(
                "Location Deleted Successfully!",
                TOAST_TYPE.SUCCESS
            );
          } else {
            this.toastService.showToast(
                "Failed to delete location. Try again!",
                TOAST_TYPE.DANGER
            );
          }
        },
            (err: HttpErrorResponse) => {
              this.toastService.showToast(err.error.msg, TOAST_TYPE.DANGER);
            }
        );
  }

  addLocation() {
    this.dialogRef = this.dialog.open(AddLocationComponent, {
      width: "600px",
      closeOnNavigation: true
    });
    this.dialogRef.afterClosed().pipe(switchMap((res: any) => {
      if (res) {
        return this.locationsService.addNewLocation(res);
      }
      return EMPTY;
    })).subscribe((res: boolean) => {
      if (res) {
        this.toastService.showToast("Location added successfully!", TOAST_TYPE.SUCCESS);
      } else {
        this.toastService.showToast("Failed to add location. Try again!", TOAST_TYPE.DANGER);
      }
    },
        (err: HttpErrorResponse) => {
          this.toastService.showToast(err.error.msg, TOAST_TYPE.DANGER);
        }
    );
  }

  restoreLocation(eventArgs: any) {
    this.dialogRef = this.dialog.open(ActionConfirmDialogComponent, {
      width: "450px",
      closeOnNavigation: true,
      data: {
        title: "Confirm Restore Location",
        messageLine1: "Are you sure you want to restore the location?",
        successText: "Restore",
      },
    });
    this.dialogRef.afterClosed().pipe(switchMap((res: boolean) => {
      if (res) {
        return this.locationsService.deleteLocation(eventArgs.locationID, true);
      }
      return EMPTY;
    }))
        .subscribe((serverRes: boolean) => {
              if (serverRes) {
                this.toastService.showToast(
                    "Location restored Successfully!",
                    TOAST_TYPE.SUCCESS
                );
              } else {
                this.toastService.showToast(
                    "Failed to restore Location. Try again!",
                    TOAST_TYPE.DANGER
                );
              }
            },
            (err: HttpErrorResponse) => {
              this.toastService.showToast(err.error.msg, TOAST_TYPE.DANGER);
            }
        );
  }

  viewLocation(eventArgs: any) {
  }
}
