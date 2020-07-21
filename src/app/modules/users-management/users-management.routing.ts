import { DetailsComponent } from './details/details.component';
import { Routes } from "@angular/router";
import { UsersManagementComponent } from './users-management.component';
import { TrendsComponent } from './trends/trends.component';
import { TrainingResultsComponent } from './training-results/training-results.component';

export const UsersManagementRoutes: Routes = [
    {
        path: "",
        children: [
            {
                path: "",
                component: UsersManagementComponent,
            },
            {
                path: "trends",
                component: TrendsComponent,
            },
            {
                path: "trainingdetails",
                component: DetailsComponent,
            },
            {
                path: "trainingresults",
                component: TrainingResultsComponent,
            },
        ],
    },
];
