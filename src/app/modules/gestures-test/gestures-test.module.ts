import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GesturesTestComponent } from "./gestures-test.component";
import { RouterModule } from "@angular/router";
import { GesturesTestRoutes } from "./gestures-test.routing";
import { MaterialModule } from "../../material.module";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { HammerModule } from "@angular/platform-browser";

@NgModule({
  declarations: [GesturesTestComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(GesturesTestRoutes),
    MaterialModule,
    DragDropModule,
    HammerModule,
  ],
})
export class GesturesTestModule {}
