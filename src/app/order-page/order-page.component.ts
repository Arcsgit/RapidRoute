import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { Item } from '../models/item';
import { OrderItem } from '../models/order-item';
import { AdditemrowComponent } from '../additemrow/additemrow.component';
import { Subject, takeUntil } from 'rxjs';
import { Router, Event, RouterLink } from '@angular/router'; 
import { NavigationEnd } from '@angular/router';
import { Order } from '../models/order';

interface Result {
  nodes: number[];
  totalDistance: number;
  store: number;
}

@Component({
  selector: 'app-order-page',
  standalone: true,
  imports: [ FormsModule, RouterLink ],
  templateUrl: './order-page.component.html',
  styleUrl: './order-page.component.css'
})

export class OrderPageComponent {
  order: Order = new Order([], 0);
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
  
  addItem(): void {
    let componentRef = this.container.createComponent(AdditemrowComponent);
    componentRef.instance.dataEvent.subscribe((data:OrderItem) => {
      if(data.getItem() != undefined && !Number.isNaN(data.getQty())) {
        for(let item of this.order.getOrderItems()) {
          if(item.getItemId() == data.getItemId()) {
            item.setQty(item.getQty() + data.getQty());
            return;
          }
        }
        this.order.getOrderItems().push(data);
      }
    });
  }

  placeOrder(): void { this.order.setDestination(this.destination); }

}

