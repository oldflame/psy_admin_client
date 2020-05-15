import { Routes } from "@angular/router";
import { CategoriesComponent } from "./categories/categories.component";
import { ImagesComponent } from "./images/images.component";
import { AddImageComponent } from './add-image/add-image.component';

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
      {
        path: "add",
        component: AddImageComponent,
      },
    ],
  },
];
