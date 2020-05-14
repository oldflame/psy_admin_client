import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LocationListComponent } from "./location-list/location-list.component";
import { MaterialModule } from "../../../material.module";
import { CategoriesListComponent } from "./categories-list/categories-list.component";
import { ImagesListComponent } from "./images-list/images-list.component";
import { MomentModule } from 'ngx-moment';

@NgModule({
  declarations: [
    LocationListComponent,
    CategoriesListComponent,
    ImagesListComponent,
  ],
  imports: [CommonModule, MaterialModule, MomentModule],
  exports: [
    LocationListComponent,
    CategoriesListComponent,
    ImagesListComponent,
  ],
})
export class ListsModule {}
