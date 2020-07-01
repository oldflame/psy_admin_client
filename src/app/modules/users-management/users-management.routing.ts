import { Routes } from "@angular/router";
import { UsersManagementComponent } from './users-management.component';
import { TrendsComponent } from './trends/trends.component';

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
        ],
    },
];
