import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { Item } from '../models/item';
import { OrderItem } from '../models/order-item';
import { AdditemrowComponent } from '../additemrow/additemrow.component';
import { Subject, takeUntil } from 'rxjs';
import { Router, RouterOutlet, Event, RouterLink } from '@angular/router'; 
import { NavigationEnd } from '@angular/router';
import { Order } from '../models/order';
import { DeliveryManagement } from '../models/delivery-management';

interface Result {
  nodes: number[];
  totalDistance: number;
  store: number;
}

@Component({
  selector: 'app-order-page',
  standalone: true,
  imports: [ FormsModule, RouterOutlet, RouterLink ],
  templateUrl: './order-page.component.html',
  styleUrl: './order-page.component.css'
})


export class OrderPageComponent {

  obj: DeliveryManagement = new DeliveryManagement(6,0);

  path: Result|null = null;
  res: boolean = false;
  order: Order = new Order([], 0);
  // orderItems: OrderItem[] = [];
  destination: number = 0;

  allItems: Item[] = Item.getAllItems();
  maxQty: number[] = [...Array(20).keys()].map(i => i + 1);

  @ViewChild('reusableComponent', { read: ViewContainerRef }) container!: ViewContainerRef;
  
  private destroy$ = new Subject<void>();

  constructor(private router: Router) {
    this.router.events
      .pipe(takeUntil(this.destroy$))
      .subscribe((event: Event) => {
        if (event instanceof NavigationEnd) {
          if (this.container && !this.router.url.includes(this.router.routerState.snapshot.url)) {
            this.container.clear();
          }
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  addComponent() {
    let componentRef = this.container.createComponent(AdditemrowComponent);
    componentRef.instance.dataEvent.subscribe((data:OrderItem) => {
      // this.orderItems.push(data);
      this.order.getOrderItems().push(data);
      console.log(this.order);
    });
    
  }

  placeOrder(): void {
    // this.router.navigateByUrl('/home');
  }

  
  displayResult(): void {
    this.obj.addStore('Wallmart',2,2);
    this.obj.addStore('Jiomart',4,1);
    this.obj.addVehicle(0);
    this.obj.addVehicle(0);
    this.order.destination = this.destination;
    this.path = this.obj.addOrder(this.order);
    console.log(`Total distance: ${this.path?.totalDistance.toFixed(1)} km`);
    console.log(`Path: ${this.path?.nodes.join(' -> ')}`);
    console.log(`Item pickup at store: ${this.path?.store}`);
    this.res = true;
  }

}

