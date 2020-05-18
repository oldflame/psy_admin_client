import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './overview.component';
import { RouterModule } from '@angular/router';
import { OverviewRoutes } from './overview.routing';
import { MaterialModule } from '../../material.module';

@NgModule({
  declarations: [OverviewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(OverviewRoutes),
    MaterialModule
  ]
})
export class OverviewModule { }
