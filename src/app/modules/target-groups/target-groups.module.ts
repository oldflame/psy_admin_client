import {NgModule, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TargetGroupsComponent } from './target-groups.component';
import { TargetGroupsRoutes } from "./target-groups.routing";
import {RouterModule} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {WidgetsModule} from "../general/widgets/widgets.module";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {ReactiveFormsModule} from "@angular/forms";
import {PipesModule} from "../general/pipes/pipes.module";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatButtonModule} from "@angular/material/button";
import {ListsModule} from "../general/lists/lists.module";

@NgModule({
  declarations: [TargetGroupsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(TargetGroupsRoutes),
    MatIconModule,
    WidgetsModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    PipesModule,
    MatTooltipModule,
    MatButtonModule,
    ListsModule,
  ]
})
export class TargetGroupsModule { }
