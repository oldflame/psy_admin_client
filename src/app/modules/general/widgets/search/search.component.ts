import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ElementRef,
  OnDestroy
} from "@angular/core";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import * as _ from "lodash";
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: "search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"]
})
export class SearchComponent implements OnInit, OnDestroy {
  @Input("placeholder") placeholder: string;
  @Input("multiple") multiple: boolean;
  @Input("hint") hintText: string;
  searchTerms = [];
  textChangeTimeout;
  setSearchTextFocus = false;
  initSubscription: Subscription;

  // chip config
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  // Enter, comma
  separatorKeysCodes = [ENTER, COMMA];

  @Output("searchChange") searchChanged = new EventEmitter();

  @ViewChild("searchChipInput", { static: true }) searchChipInput: ElementRef;
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.initSubscription = this.route.queryParams.subscribe(params => {
      if (params.q) {
        this.searchTerms = params.q.split("+");
        this.searchChanged.emit({ searchTerms: _.cloneDeep(this.searchTerms) });
      }
    });
  }

  ngOnDestroy() {
    this.initSubscription.unsubscribe();
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our term
    if ((value || "").trim()) {
      this.searchTerms.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = "";
    }

    this.searchChanged.emit({ searchTerms: _.cloneDeep(this.searchTerms) });
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        q:
          this.searchTerms.length > 0
            ? this.searchTerms
                .toString()
                .split(",")
                .join("+")
            : null
      }
    });
  }

  remove(term: any): void {
    const index = this.searchTerms.indexOf(term);

    if (index >= 0) {
      this.searchTerms.splice(index, 1);
    }

    this.searchChanged.emit({ searchTerms: _.cloneDeep(this.searchTerms) });
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        q:
          this.searchTerms.length > 0
            ? this.searchTerms
                .toString()
                .split(",")
                .join("+")
            : null
      }
    });
  }

  searchTextChanged(searchTerm) {
    this.searchChanged.emit({ searchTerms: _.cloneDeep(searchTerm.value) });
  }
}
