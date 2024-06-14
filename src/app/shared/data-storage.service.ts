import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { VehicleService } from "../vehicles/vehicle.service";
import { User } from "../vehicles/user/user.model";
import { Vehicle } from "../vehicles/vehicle.model";

@Injectable({providedIn:'root'})
export class DataStorageService{
    constructor(private http:HttpClient, private vehicleService:VehicleService){}

    storedVehicles(){
        const vehicles = this.vehicleService.getVehicles();
        this.http.put<Vehicle[]>(
            'https://angular-assessment-333e5-default-rtdb.firebaseio.com/vehicles.json',
            vehicles
        ).subscribe(
            (response)=>{console.log(response);
            }
        );
    }

    retrieveVehicles(){
        return this.http.get<Vehicle[]>(
            'https://angular-assessment-333e5-default-rtdb.firebaseio.com/vehicles.json')
    }

    addUser(userData:User){   
        this.http.put<User>('https://angular-assessment-333e5-default-rtdb.firebaseio.com/userData.json',
            userData
        ).subscribe((response)=>{
            console.log(response);    
        })
    }

    retrieveUserDetail(){
        return this.http.get<User>('https://angular-assessment-333e5-default-rtdb.firebaseio.com/userData.json')    
    }

    updateVehicle(vId:number, vehicle: Vehicle) {
        return this.http.patch<Vehicle>(
          `https://angular-assessment-333e5-default-rtdb.firebaseio.com/vehicles/${vId}.json`,
          vehicle
        );
    }
}