import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
import { OverviewModule } from "./modules/overview/overview.module";
import { AuthLayoutModule } from "./layouts/auth-layout/auth-layout.module";

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
