import { Component, Input } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { DeliveryManagement } from '../models/delivery-management';
import { Order } from '../models/order';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ RouterLink, RouterOutlet ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  doneDelivery: number = 0;
  failedDelivery: number = 0;

  // static readonly obj: DeliveryManagement = new DeliveryManagement(6,0);
  
  constructor(private router: Router) {
    console.log('Home constructor');
    
  }

  start(): void {
    // HomeComponent.obj.addStore('Wallmart',2,2);
    // HomeComponent.obj.addStore('Jiomart',4,1);
    // HomeComponent.obj.addVehicle(0);
    // HomeComponent.obj.addVehicle(0);
    // console.log(HomeComponent.obj.stores)
    // console.log(HomeComponent.obj.vehicles);
  }
  
  ngOnInit() {
    // console.log("home ngoninit");
    // console.log(HomeComponent.obj.stores)
    // console.log(HomeComponent.obj.vehicles);
    // let newOrder: Order = history.state.newOrder;
    // newOrder.destination = history.state.newDest;
    // HomeComponent.obj.orders.push(newOrder);
    // if(newOrder)
    //   HomeComponent.obj.addOrder(newOrder);
    // console.log('order Done');
  }

  addOrder(page: string): void {
    this.router.navigateByUrl('/'+page);
    
  }

}
