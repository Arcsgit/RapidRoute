import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Item } from '../models/item';
import { OrderItem } from '../models/order-item';

@Component({
  selector: 'app-additemrow',
  standalone: true,
  imports: [ FormsModule ],
  templateUrl: './additemrow.component.html',
  styleUrl: './additemrow.component.css'
})

export class AdditemrowComponent {
  @Output() dataEvent = new EventEmitter<OrderItem>();

  click: boolean = false;
  disable: boolean = false;

  allItems: Item[] = Item.getAllItems();
  maxQty: number[] = [...Array(20).keys()].map(i => i + 1);

  confirmBtn(item: any): void {
    item.preventDefault();
    this.click = true;
    this.dataEvent.emit(new OrderItem(item.target.name.value, parseInt(item.target.qty.value)));
    this.disable = true;
  }

}
