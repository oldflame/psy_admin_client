import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingsComponent } from './trainings/trainings.component';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule } from '@angular/router';
import { TrainingManagementRoutes } from './training-management.routing';



@NgModule({
  declarations: [TrainingsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(TrainingManagementRoutes),
  ]
})
export class TrainingManagementModule { }
