import { AuthGuard } from './helpers/AuthGuard';
import { FilterPipe } from './pages/family-search/filter.pipe';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FamilySearchComponent } from './pages/family-search/family-search.component';
import { RcaViewComponent } from './pages/rca-view/rca-view.component';
import { AuthenticationService } from './services/AuthenticationService';
import { DataService } from './services/DataService';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalContent } from './pages/family-search/modal-content'
import { JwtInterceptor } from './helpers/JWTInterceptor';
import { fakeBackendProvider } from './helpers/Backend';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    FamilySearchComponent,
    RcaViewComponent,
    ModalContent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSnackBarModule,
    FormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [
    AuthenticationService,
    DataService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider
  ],
  exports:[
    MatSnackBarModule,
    FilterPipe
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
