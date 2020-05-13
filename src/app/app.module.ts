import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";

import { SharedModule } from "./modules/shared/components.module";
import { AppRoutingModule } from './app-routing.module';
import { InterceptorService } from './services/interceptor.service';
import { MaterialModule } from './material.module';
import { FIREBASE_CONFIG } from './config';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    RouterModule,
    AppRoutingModule,
    MaterialModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  declarations: [AppComponent, AdminLayoutComponent, AuthLayoutComponent],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
