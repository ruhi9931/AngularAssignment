import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../vehicle.model';
import { VehicleService } from '../vehicle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[] = [];
  constructor(private vehicleService: VehicleService, private router: Router, private route: ActivatedRoute, private datastorageService: DataStorageService) { }

  ngOnInit() {
    this.datastorageService.retrieveVehicles().subscribe(
      (res) => {
        this.vehicles = res
      }
    );
  }

  onClick(index: number) {
    this.router.navigate([index], { relativeTo: this.route });
  }
}
