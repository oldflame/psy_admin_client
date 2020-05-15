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

@Component({
  selector: "locations",
  templateUrl: "./locations.component.html",
  styleUrls: ["./locations.component.scss"],
})
export class LocationsComponent implements OnInit {
  locations$: Observable<Location[]>;
  dialogRef;

  constructor(
      private locationsService: LocationsService,
      private dialog: MatDialog,
      private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.locations$ = this.locationsService.locations$.pipe(
      map((locations: Location[]) => {
        if (locations && locations.length > 0) {
          locations = _.sortBy(locations, "name");
        }
        return locations;
      })
    );
    this.locationsService.getActiveLocations().subscribe();
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
        });
  }

  viewLocation(eventArgs: any) {
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
    })
  }
}
