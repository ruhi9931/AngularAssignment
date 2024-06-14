import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VehicleService } from '../vehicle.service';
import { Vehicle } from '../vehicle.model';
import { NgForm } from '@angular/forms';

import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Dialog } from 'primeng/dialog';

@Component({
  selector: 'app-vehicle-detail',
  templateUrl: './vehicle-detail.component.html',
  styleUrls: ['./vehicle-detail.component.css']
})
export class VehicleDetailComponent implements OnInit {
  vehicle: Vehicle = new Vehicle(0, '', 0, '', false);
  vehicleId!: number;
  vehicles!: Vehicle[];
  totalAmount: number = 0;
  dialog: boolean = false;
  @ViewChild('dialogRef') dialogRef!: Dialog;

  constructor(private route: ActivatedRoute, private vehicleService: VehicleService, private datastorageService: DataStorageService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.vehicleId = +params['id'];
      this.datastorageService.retrieveVehicles().subscribe(
        (res) => {
          this.vehicles = res;
          const foundVehicle = this.vehicles.find(v => v.id === this.vehicleId);
          if (foundVehicle) {
            this.vehicle = foundVehicle;
          } else {
            console.error('Vehicle not found');
          }
          //this.vehicle=this.vehicles[this.vehicleId];
        }
      );
    });
  }



  onSubmitBookingForm(f: NgForm) {
    const startDate: Date = new Date(f.value.startDate);
    const endDate: Date = new Date(f.value.endDate);

    const diffInMs: number = endDate.getTime() - startDate.getTime();
    const diffInDays: number = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

    this.totalAmount = diffInDays * this.vehicle.perDay;
    this.vehicle['available'] = false;
    // let vId = this.vehicle.id > -1 ? this.vehicle.id - 1 : 0;
    let vId = this.vehicle.id;
    this.datastorageService.updateVehicle(vId, this.vehicle).subscribe(() => {
      console.log('Vehicle availability updated successfully.');
      
    });
    this.dialog = true;
  }

  onSubmitUserForm(f2: NgForm) {
    this.datastorageService.addUser(f2.value);
    this.dialogRef.close({} as Event);

  }
}
