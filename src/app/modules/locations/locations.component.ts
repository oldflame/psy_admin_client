import { Component, OnInit } from "@angular/core";
import { LocationsService } from "../../services/locations.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Location } from "../../models/location";
import * as _ from "lodash";

@Component({
  selector: "locations",
  templateUrl: "./locations.component.html",
  styleUrls: ["./locations.component.scss"],
})
export class LocationsComponent implements OnInit {
  locations$: Observable<Location[]>;

  constructor(private locationsService: LocationsService) {}

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
    console.log("deleting location", eventArgs);
  }

  viewLocation(eventArgs: any) {
    console.log("Viewing Location", eventArgs);
  }
}
