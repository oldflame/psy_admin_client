import { Component } from "@angular/core";
import {
  Router,
  Event,
  NavigationStart,
  NavigationEnd,
  NavigationError,
} from "@angular/router";
import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  constructor(
    private router: Router,
    private swUpdate: SwUpdate,
    private snackbar: MatSnackBar
  ) {
    this.swUpdate.available.subscribe((evt) => {
      this.swUpdate.checkForUpdate().then(() => {
        const snack = this.snackbar.open("App update available", "Update now");
        snack.onAction().subscribe(() => {
          window.location.reload();
        });
      });
    });
  }
}
