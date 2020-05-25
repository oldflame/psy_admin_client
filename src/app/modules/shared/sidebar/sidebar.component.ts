import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

const misc: any = {
  sidebar_mini_active: true,
};

export interface RouteInfo {
  path: string;
  title: string;
  type: string;
  icontype: string;
  collapse?: string;
  isCollapsed?: boolean;
  isCollapsing?: any;
  children?: ChildrenItems[];
}

export interface ChildrenItems {
  path: string;
  title: string;
  type?: string;
  collapse?: string;
  children?: ChildrenItems2[];
  isCollapsed?: boolean;
}
export interface ChildrenItems2 {
  path?: string;
  title?: string;
  type?: string;
}
// Menu Items
export const ROUTES: RouteInfo[] = [
  {
    path: "/overview",
    title: "Dashboard",
    type: "link",
    icontype: "dashboard",
  },
  {
    path: "/locations",
    title: "Locations",
    type: "link",
    icontype: "location_city",
  },
  {
    path: "/question-management",
    title: "Questions Management",
    type: "sub",
    icontype: "question_answer",
    collapse: "questions-management",
    isCollapsed: true,
    children: [
      {path: "categories", title:"Question Categories", type: "link"},
      {path: "questions", title:"Questions", type: "link"}
    ]
  },
  {
    path: "/image-management",
    title: "Image Management",
    type: "sub",
    icontype: "photo_library",
    collapse: "image-management",
    isCollapsed: true,
    children: [
      {path: "categories", title:"Image Categories", type: "link"},
      {path: "images", title:"Images", type: "link"},
      {path: "images/add", title:"Add Image", type: "child"}
    ]
  },
  {
    path: "/training-management/trainings",
    title: "Trainings",
    type: "link",
    icontype: "business",
  },
  {
    path: "/target-groups",
    title: "Target Groups",
    type: "link",
    icontype: "group",
  },
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }
  onMouseEnterSidenav() {
    if (!document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.add("g-sidenav-show");
    }
  }
  onMouseLeaveSidenav() {
    if (!document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.remove("g-sidenav-show");
    }
  }
  minimizeSidebar() {
    const sidenavToggler = document.getElementsByClassName(
      "sidenav-toggler"
    )[0];
    const body = document.getElementsByTagName("body")[0];
    if (body.classList.contains("g-sidenav-pinned")) {
      misc.sidebar_mini_active = true;
    } else {
      misc.sidebar_mini_active = false;
    }
    if (misc.sidebar_mini_active === true) {
      body.classList.remove("g-sidenav-pinned");
      body.classList.add("g-sidenav-hidden");
      sidenavToggler.classList.remove("active");
      misc.sidebar_mini_active = false;
    } else {
      body.classList.add("g-sidenav-pinned");
      body.classList.remove("g-sidenav-hidden");
      sidenavToggler.classList.add("active");
      misc.sidebar_mini_active = true;
    }
  }
}
