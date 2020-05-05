import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './overview.component';
import { RouterModule } from '@angular/router';
import { OverviewRoutes } from './overview.routing';

@NgModule({
  declarations: [OverviewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(OverviewRoutes)
  ]
})
export class OverviewModule { }
