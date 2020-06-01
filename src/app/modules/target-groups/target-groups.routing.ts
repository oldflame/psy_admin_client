import { TargetGroupsComponent } from "./target-groups.component";
import { Routes } from "@angular/router";

export const TargetGroupsRoutes: Routes = [
    {
        path: "",
        children: [
            {
                path: "",
                component: TargetGroupsComponent,
            },
        ],
    },
];
