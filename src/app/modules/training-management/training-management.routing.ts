import { Routes } from "@angular/router";
import { TrainingsComponent } from './trainings/trainings.component';
import { UpdateTrainingComponent } from './update-training/update-training.component';

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
      {
        path: "manage",
        component: UpdateTrainingComponent,
      },
    ],
  },
];
