import { Injectable } from "@angular/core";
import { Vehicle } from "./vehicle.model";

@Injectable()
export class VehicleService{
    private vehicles: Vehicle[] = [
        // new Vehicle(
        //     1,
        //     'BMW F6',
        //     500,
        //     'assets/images/p8.png',
        //     true
        // ),
        // new Vehicle(
        //     2,
        //     'Nissan',
        //     100,
        //     'assets/images/p10.png',
        //     true
        // ),
        // new Vehicle(
        //     3,
        //     'Renault',
        //     150,
        //     'assets/images/p10.png',
        //     true
        // ),
        // new Vehicle(
        //     4,
        //     'Duster',
        //     200,
        //     'assets/images/p8.png',
        //     true
        // ),
        // new Vehicle(
        //     5,
        //     'BMW F6',
        //     500,
        //     'assets/images/p8.png',
        //     true
        // ),
        // new Vehicle(
        //     6,
        //     'Nissan',
        //     100,
        //     'assets/images/p10.png',
        //     true
        // ),
        // new Vehicle(
        //     7,
        //     'Renault',
        //     150,
        //     'assets/images/p10.png',
        //     false
        // ),
        // new Vehicle(
        //     8,
        //     'Duster',
        //     200,
        //     'assets/images/p8.png',
        //     false
        // )


 new Vehicle(
            0,
            'BMW F6',
            500,
            'assets/images/p8.png',
            true
        ),
        new Vehicle(
            1,
            'Nissan',
            100,
            'assets/images/p10.png',
            true
        ),
        new Vehicle(
            2,
            'Renault',
            150,
            'assets/images/p10.png',
            true
        ),
        new Vehicle(
            3,
            'Duster',
            200,
            'assets/images/p8.png',
            true
        ),
        new Vehicle(
            4,
            'BMW F6',
            500,
            'assets/images/p8.png',
            true
        ),
        new Vehicle(
            5,
            'Nissan',
            100,
            'assets/images/p10.png',
            true
        ),
        new Vehicle(
            6,
            'Renault',
            150,
            'assets/images/p10.png',
            false
        ),
        new Vehicle(
            7,
            'Duster',
            200,
            'assets/images/p8.png',
            false
        )

    ];
    getVehicles(){
        return this.vehicles.slice();
    }

    getVehicle(index:number){
        return this.vehicles[index];
    }

    setVehicles(vehicles: Vehicle[]) {
        this.vehicles = vehicles;
    }

    addVehicle(vehicle: Vehicle) {
        this.vehicles.push(vehicle);
    }

    updateVehicle(index: number, newVehicle: Vehicle) {
        this.vehicles[index] = newVehicle;
    }
    
    deleteVehicle(index: number) {
        this.vehicles.splice(index, 1);
    }
}