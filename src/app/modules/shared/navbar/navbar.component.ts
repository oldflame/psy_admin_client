import { Component, OnInit, ElementRef } from "@angular/core";
import { ROUTES } from "../sidebar/sidebar.component";
import { AuthService } from '../../../services/auth.service';
import { Observable } from 'rxjs';
import {
  Router,
  Event,
  NavigationStart,
  NavigationEnd,
  NavigationError,
} from "@angular/router";

import {
  Location,
  LocationStrategy,
  PathLocationStrategy,
} from "@angular/common";
import { Admin } from 'src/app/models/admin';

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  sidenavOpen: boolean = true;
  admin$: Observable<Admin>;
  constructor(
    location: Location,
    private element: ElementRef,
    private router: Router,
    private authService: AuthService
  ) {
    this.location = location;
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        // Show loading indicator
      }
      if (event instanceof NavigationEnd) {
        // Hide loading indicator

        if (window.innerWidth < 1200) {
          document.body.classList.remove("g-sidenav-pinned");
          document.body.classList.add("g-sidenav-hidden");
          this.sidenavOpen = false;
        }
      }

      if (event instanceof NavigationError) {
        // Hide loading indicator

        // Present error to user
      }
    });
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter((listTitle) => listTitle);
    this.admin$ = this.authService.auth$;
  }

  getTitle() {
    let title: any = this.location.prepareExternalUrl(this.location.path());
    if (title.indexOf("?") != -1) {
      title = title.substring(0, title.indexOf("?"));
    }
    for (let i = 0; i < this.listTitles.length; i++) {
      if (
        (this.listTitles[i].type === "link" ||
          this.listTitles[i].type === "child") &&
        this.listTitles[i].path === title
      ) {
        return this.listTitles[i].title;
      } else if (this.listTitles[i].type === "sub") {
        for (let j = 0; j < this.listTitles[i].children.length; j++) {
          const subtitle =
            this.listTitles[i].path + "/" + this.listTitles[i].children[j].path;
          if (subtitle === title) {
            return this.listTitles[i].children[j].title;
          }
        }
      }
    }
    return "Overview";
  }

  openSidebar() {
    if (document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.remove("g-sidenav-pinned");
      document.body.classList.add("g-sidenav-hidden");
      this.sidenavOpen = false;
    } else {
      document.body.classList.add("g-sidenav-pinned");
      document.body.classList.remove("g-sidenav-hidden");
      this.sidenavOpen = true;
    }
  }
  toggleSidenav() {
    if (document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.remove("g-sidenav-pinned");
      document.body.classList.add("g-sidenav-hidden");
      this.sidenavOpen = false;
    } else {
      document.body.classList.add("g-sidenav-pinned");
      document.body.classList.remove("g-sidenav-hidden");
      this.sidenavOpen = true;
    }
  }

  logout() {
    this.authService.logout();
  }
}
