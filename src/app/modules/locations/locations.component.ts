import { Component, OnInit } from "@angular/core";
import { LocationsService } from "../../services/locations.service";
import {EMPTY, Observable} from "rxjs";
import {map, switchMap} from "rxjs/operators";
import { Location } from "../../models/location";
import * as _ from "lodash";
import {MatDialog} from "@angular/material/dialog";
import {TOAST_TYPE, ToastService} from "../../services/toast.service";
import {AddLocationComponent} from "../general/dialogs/add-location/add-location.component";
import {
  AddImageCategoryParams,
  AddLocationParams
} from "../../models/request-params";

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
