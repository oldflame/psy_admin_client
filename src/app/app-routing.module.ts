import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
import { OverviewModule } from "./modules/overview/overview.module";
import { AuthLayoutModule } from "./layouts/auth-layout/auth-layout.module";
import { AuthGuardService } from "./services/auth-guard.service";
import { QuestionManagementModule } from "./modules/question-management/question-management.module";
import { LocationsModule } from "./modules/locations/locations.module";
import { ImageManagementModule } from "./modules/image-management/image-management.module";
import { TrainingManagementModule } from "./modules/training-management/training-management.module";
import { GesturesTestModule } from "./modules/gestures-test/gestures-test.module";
import { TargetGroupsModule } from "./modules/target-groups/target-groups.module";
import { UsersManagementModule } from './modules/users-management/users-management.module';

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "",
    component: AdminLayoutComponent,
    children: [
      {
        path: "overview",
        loadChildren: () => OverviewModule,
        canActivate: [AuthGuardService],
      },
      {
        path: "question-management",
        loadChildren: () => QuestionManagementModule,
        canActivate: [AuthGuardService],
      },
      {
        path: "image-management",
        loadChildren: () => ImageManagementModule,
        canActivate: [AuthGuardService],
      },
      {
        path: "locations",
        loadChildren: () => LocationsModule,
        canActivate: [AuthGuardService],
      },
      {
        path: "training-management",
        loadChildren: () => TrainingManagementModule,
        canActivate: [AuthGuardService],
      },
      {
        path: "gestures-test",
        loadChildren: () => GesturesTestModule,
        canActivate: [AuthGuardService],
      },
      {
        path: "target-groups",
        loadChildren: () => TargetGroupsModule,
        canActivate: [AuthGuardService],
      },
      {
        path: "users",
        loadChildren: () => UsersManagementModule,
        canActivate: [AuthGuardService],
      },
    ],
  },
  {
    path: "",
    component: AuthLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () => AuthLayoutModule,
      },
    ],
  },
  {
    path: "**",
    redirectTo: "login",
  },
];

@NgModule({
  imports: [CommonModule, BrowserModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
