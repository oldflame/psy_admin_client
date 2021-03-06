import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingsComponent } from './trainings/trainings.component';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule } from '@angular/router';
import { TrainingManagementRoutes } from './training-management.routing';
import { DialogsModule } from '../general/dialogs/dialogs.module';
import { ListsModule } from '../general/lists/lists.module';
import { PipesModule } from '../general/pipes/pipes.module';
import { WidgetsModule } from '../general/widgets/widgets.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UpdateTrainingComponent } from './update-training/update-training.component';
import { MomentModule } from 'ngx-moment';



@NgModule({
  declarations: [TrainingsComponent, UpdateTrainingComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(TrainingManagementRoutes),
    DialogsModule,
    ListsModule,
    PipesModule,
    WidgetsModule,
    ReactiveFormsModule,
    FormsModule,
    MomentModule
  ]
})
export class TrainingManagementModule { }
