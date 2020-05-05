import { OverviewComponent } from "./overview.component";
import { Routes } from '@angular/router';

export const OverviewRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: OverviewComponent,
      },
    ],
  },
];
