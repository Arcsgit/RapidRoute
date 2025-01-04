import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveryManagement } from './models/delivery-management';
import { OrderItem } from './models/order-item';
import { NavbarComponent } from "./navbar/navbar.component";
import { FooterComponent } from "./footer/footer.component";
import { RouterOutlet } from '@angular/router';
import { OrderPageComponent } from "./order-page/order-page.component";
import { Order } from './models/order';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, RouterOutlet ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'RapidRoute';

  // obj: DeliveryManagement = new DeliveryManagement(6,0); // 6 nodes including main node which is 0
  // orderItems: OrderItem[] = [];

  constructor() {
    // this.obj.addStore('Wallmart',2,2);
    // this.obj.addStore('Jiomart',4,1);
    // this.orderItems.push(new OrderItem('Book',5));
    // this.orderItems.push(new OrderItem('Rice',2));
    // this.obj.addVehicle(0);
    // this.obj.addVehicle(0);

    // this.obj.addOrder(new Order(this.orderItems,3));
  }

}
