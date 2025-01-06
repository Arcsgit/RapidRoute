import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DeliveryManagement } from '../models/delivery-management';
import { Order } from '../models/order';

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
  static doneDelivery: number = 0;
  static failedDelivery: number = 0;

  get getDone(): number { return HomeComponent.doneDelivery; }
  get getFailed(): number { return HomeComponent.failedDelivery; }

  private static readonly obj: DeliveryManagement = new DeliveryManagement(8,0);
  static {
    this.obj.addStore('Wallmart',2,2);
    this.obj.addStore('Jiomart',6,1);
    this.obj.addVehicle(0);
    this.obj.addVehicle(0);
  }

  constructor(private router: Router) {
    console.log('Home constructor');
    let newOrder: Order|null = <Order>this.router.getCurrentNavigation()?.extras?.state?.['newOrder'];
    if(newOrder) {
      newOrder = HomeComponent.obj.addOrder(newOrder);
      if(newOrder) {
        // console.log(`Total distance: ${newOrder.getPath()?.totalDistance.toFixed(1)} km`);
        // console.log(`Path: ${newOrder.getPath()?.nodes.join(' -> ')}`);
        // console.log(`Item pickup at store: ${newOrder.getStore()?.getStoreID()}`);
        HomeComponent.doneDelivery++;
      }
      else {
        HomeComponent.failedDelivery++;
      }
    }
  }

  getAllOrders(): Order[] {
    return HomeComponent.obj.orders.reverse();
  }
}
