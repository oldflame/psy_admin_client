import { Routes } from "@angular/router";
import { UsersManagementComponent } from './users-management.component';

export const UsersManagementRoutes: Routes = [
    {
        path: "",
        children: [
            {
                path: "",
                component: UsersManagementComponent,
            },
        ],
    },
];
