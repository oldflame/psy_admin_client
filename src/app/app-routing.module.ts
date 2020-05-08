import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
import { OverviewModule } from "./modules/overview/overview.module";
import { AuthLayoutModule } from "./layouts/auth-layout/auth-layout.module";
import { QuestionsModule } from './modules/questions/questions.module';
import { AuthGuardService } from './services/auth-guard.service';
import { LocationsModule } from './modules/locations/locations.module';

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
        canActivate: [AuthGuardService]
      },
      {
        path: "questions",
        loadChildren: () => QuestionsModule,
        canActivate: [AuthGuardService]
      },
      {
        path: "locations",
        loadChildren: () => LocationsModule,
        canActivate: [AuthGuardService]
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
