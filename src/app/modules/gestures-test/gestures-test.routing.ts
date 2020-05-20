import { Routes } from "@angular/router";
import { GesturesTestComponent } from "./gestures-test.component";

export const GesturesTestRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: GesturesTestComponent,
      },
    ],
  },
];
