import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LocationListComponent } from "./location-list/location-list.component";
import { MaterialModule } from "../../../material.module";
import { CategoriesListComponent } from "./categories-list/categories-list.component";
import { ImagesListComponent } from "./images-list/images-list.component";
import { MomentModule } from 'ngx-moment';
import { TargetGroupsListComponent } from './target-groups-list/target-groups-list.component';

@NgModule({
  declarations: [
    LocationListComponent,
    CategoriesListComponent,
    ImagesListComponent,
    TargetGroupsListComponent,
  ],
  imports: [CommonModule, MaterialModule, MomentModule],
  exports: [
    LocationListComponent,
    CategoriesListComponent,
    ImagesListComponent,
    TargetGroupsListComponent,
  ],
})
export class ListsModule {}
