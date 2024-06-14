import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './vehicles/header/header.component';
import { HomeComponent } from './vehicles/home/home.component';


import { VehicleListComponent } from './vehicles/vehicle-list/vehicle-list.component';
import { VehicleDetailComponent } from './vehicles/vehicle-detail/vehicle-detail.component';
import { UserComponent } from './vehicles/user/user.component';

import { BookingComponent } from './booking/booking.component';
import { ManageComponent } from './booking/manage/manage.component';
import { AuthhComponent } from './authh/authh.component';
import { AuthGuard } from './Auth/auth.guard';


const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'auth', component: AuthhComponent },
  { path: 'home', component: HomeComponent , canActivate:[AuthGuard]},
  { path: 'home/vehicle-list', component: VehicleListComponent },
  // {path:'vehicle-list',component:VehicleListComponent},
  { path: 'home/vehicle-list/:id', component: VehicleDetailComponent },
  { path: 'user-detail', component: UserComponent },
  { path: 'booking', component: BookingComponent },
  {path:'manage',component:ManageComponent}
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
