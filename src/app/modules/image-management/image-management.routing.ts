import { Routes } from "@angular/router";
import { CategoriesComponent } from "./categories/categories.component";
import { ImagesComponent } from "./images/images.component";

export const ImageManagementRoutes: Routes = [
  {
    path: "",
    redirectTo: "images",
  },
  {
    path: "categories",
    children: [
      {
        path: "",
        component: CategoriesComponent,
      },
    ],
  },
  {
    path: "images",
    children: [
      {
        path: "",
        component: ImagesComponent,
      },
    ],
  },
];
