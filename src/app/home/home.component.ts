import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DeliveryManagement } from '../models/delivery-management';
import { Order } from '../models/order';
import { Store } from '../models/store';

interface Path {
  nodes: number[];
  totalDistance: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ RouterLink  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  vehicleAdd: boolean = false;
  static doneDelivery: number = 0;
  static failedDelivery: number = 0;

  get getDone(): number { return HomeComponent.doneDelivery; }
  get getFailed(): number { return HomeComponent.failedDelivery; }

  private static readonly obj: DeliveryManagement = new DeliveryManagement(8,0);
  static {
    this.obj.addStore(new Store('Wallmart',2,2));
    this.obj.addStore(new Store('Jiomart',6,1));
    this.obj.addVehicle(0);
    this.obj.addVehicle(0);
    this.obj.addVehicle(0);
    this.obj.addVehicle(0);
  }

  constructor(private router: Router) {
    let newOrder: Order|null = <Order>this.router.getCurrentNavigation()?.extras?.state?.['newOrder'];
    let newStore: Store|null = <Store>this.router.getCurrentNavigation()?.extras?.state?.['newStore'];
    if(newOrder) {
      newOrder = HomeComponent.obj.addOrder(newOrder);
      if(newOrder) HomeComponent.doneDelivery++;
      else HomeComponent.failedDelivery++;
    }
    else if(newStore) HomeComponent.obj.addStore(newStore);
  }

  getAllOrders(): Order[] { return HomeComponent.obj.orders.reverse(); }

  addVehicle(): void { 
    HomeComponent.obj.addVehicle(0); 
    this.vehicleAdd = true;
    setTimeout(() => {
        this.vehicleAdd = false;
    }, 3000);
  }

  secret(): void {
    while(HomeComponent.obj.stores.length > 2) HomeComponent.obj.stores.pop();
    while(HomeComponent.obj.vehicles.length > 4) HomeComponent.obj.vehicles.pop();
    console.log('Done');
  }

}

