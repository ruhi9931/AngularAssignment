import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { VehiclesComponent } from './vehicles/vehicles.component';
import { BookingComponent } from './booking/booking.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './vehicles/home/home.component';
import { HeaderComponent } from './vehicles/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { VehicleService } from './vehicles/vehicle.service';
import { VehicleListComponent } from './vehicles/vehicle-list/vehicle-list.component';
import { VehicleDetailComponent } from './vehicles/vehicle-detail/vehicle-detail.component';
import { UserComponent } from './vehicles/user/user.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { AuthService } from './Auth/auth.service';
import { ManageComponent } from './booking/manage/manage.component';
import { AuthhComponent } from './authh/authh.component';
import { AuthInterceptorService } from './Auth/auth-interceptor.service';



@NgModule({
  declarations: [
    AppComponent,
    VehiclesComponent,
    BookingComponent,
    HomeComponent,
    HeaderComponent,
    VehicleListComponent,
    VehicleDetailComponent,
    UserComponent,
    ManageComponent,
    AuthhComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DialogModule,
    ButtonModule,
    HttpClientModule
  ],
  providers: [VehicleService,AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
