import { Component, ViewChild } from '@angular/core';
import { VehicleService } from '../vehicles/vehicle.service';
import { DataStorageService } from '../shared/data-storage.service';
import { Vehicle } from '../vehicles/vehicle.model';
import { NgForm } from '@angular/forms';
import { Dialog } from 'primeng/dialog';
import { User } from '../vehicles/user/user.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent {
  vId!: number;
  vehicle!: Vehicle;
  foundVehicle!: Vehicle[];
  vid!: number;
  @ViewChild('dialogRef')
  dialogRef!: Dialog;
  vehicles!: Vehicle[];
  dialog:boolean=false;
  constructor(private vehicleService:VehicleService, private datastorageService:DataStorageService){}
  
  ngOnInit(){
    this.datastorageService.retrieveVehicles().subscribe(
      (res)=>{this.vehicles=res}
    );
  }

  onClick(id:number){
    this.dialog=true;
    const foundVehicle= this.vehicles.find(v=>v.id===id);
    if(foundVehicle){
      this.vehicle=foundVehicle;
    }else{
      console.error('Vehicle not found!');
    }
    this.vId=this.vehicle.id;
  }

  onSubmitBookingForm(bookingForm:NgForm){
    // console.log(bookingForm);
    // console.log(bookingForm);
    const event = new Event('dummy');
    this.dialogRef.close(event); 
    
    if (this.vehicle) {
      this.vehicle.available = false; 
      this.datastorageService.updateVehicle(this.vId, this.vehicle).subscribe(
          (res) => {
              console.log(res);
          },
          (error) => {
              console.error('Error updating vehicle:', error);
          }
      );
  } else {
      console.error('Vehicle not found!');
  }


    // const vehicle: Vehicle = {
    //   id: bookingForm.value.id,
    //   model: bookingForm.value.model,
    //   perDay:bookingForm.value.perDay,
    //   imagePath:bookingForm.value.imagePath,
    //   available:bookingForm.value.available
    // };
   

    const user:User = {
      name: bookingForm.value.name,
      address: bookingForm.value.address,
      email: bookingForm.value.email,
      phone: bookingForm.value.phone,
      dob: bookingForm.value.dob,
      dl: bookingForm.value.dl
    }
    
    this.datastorageService.addUser(user);
    // console.log(user);

    this.datastorageService.updateVehicle(this.vId,this.vehicle).subscribe(
      (res)=>{console.log(res);
      }
    )
    
  }
}
