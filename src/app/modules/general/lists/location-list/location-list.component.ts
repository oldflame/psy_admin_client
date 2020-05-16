import { Location } from '../../../../models/location';
import {
  Component,
  OnInit,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
  EventEmitter,
} from "@angular/core";

@Component({
  selector: "location-list",
  templateUrl: "./location-list.component.html",
  styleUrls: ["./location-list.component.scss"],
})
export class LocationListComponent implements OnInit, OnChanges {
  @Input("locations") locations: Location[];

  @Output("locationDeleted") locationDeleted = new EventEmitter();
  @Output("locationViewed") locationViewed = new EventEmitter();
  @Output("locationEdited") locationEdited = new EventEmitter();
  @Output("locationRestored") locationRestored = new EventEmitter();

  showLocationsLoader = true;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.locations && changes.locations.currentValue != null) {
      this.showLocationsLoader = false;
    }
  }

  ngOnInit() {}

  deleteLocationClicked($event: any, locationID: string) {
    this.locationDeleted.emit({ locationID });
    $event.stopPropagation();
  }

  viewLocationClicked(location: Location) {
    this.locationViewed.emit({ location });
  }

  editLocationClicked($event: MouseEvent, location: Location) {
    this.locationEdited.emit({ location });
  }

  restoreLocationClicked($event: any, locationID: string) {
    this.locationRestored.emit({ locationID });
    $event.stopPropagation();
  }
}
