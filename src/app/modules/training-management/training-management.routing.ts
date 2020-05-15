import { Routes } from "@angular/router";
import { TrainingsComponent } from './trainings/trainings.component';

export const TrainingManagementRoutes: Routes = [
  {
    path: "",
    redirectTo: "trainings",
  },
  {
    path: "trainings",
    children: [
      {
        path: "",
        component: TrainingsComponent,
      },
    ],
  },
];
