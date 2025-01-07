import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { Router, Event, NavigationEnd, RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AdditemrowComponent } from '../additemrow/additemrow.component';
import { StoreItems } from '../models/store-items';
import { Store } from '../models/store';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-store-page',
  standalone: true,
  imports: [ RouterLink, FormsModule ],
  templateUrl: './store-page.component.html',
  styleUrl: './store-page.component.css'
})

export class StorePageComponent {
  message: string = 'Wrong Password';
  wrngPassCount: number = 0;
  password: string = '';
  is_Password: boolean = true;
  wrngPassDiv: boolean = false;
  is_Main: boolean = false;
  click:boolean = false;

  name: string = '';
  location: number = -1;

  storeItems: StoreItems[] = [];
  newStore: Store|null = new Store(this.name, this.location, 0);
  
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

  checkPassword(): void {
    if(this.password=='34crazy') {
      this.is_Password = false;
      this.is_Main = true;
      this.wrngPassDiv = false;
    }
    else {
      // this.wrngPassCount++;
      if(++this.wrngPassCount == 3) {
        this.message = 'Limits Exceeded';
        this.is_Password = false;
        setTimeout(() => {
          this.router.navigateByUrl('');
        }, 1500);
      }
      this.password = '';
      this.wrngPassDiv = true;
      setTimeout(() => {
        this.wrngPassDiv = false;
      }, 2000);
    }
  }

  addItem(): void {
    let componentRef = this.container.createComponent(AdditemrowComponent);
    componentRef.instance.dataEvent.subscribe((data:StoreItems) => {
      if(data.getItem() != undefined && !Number.isNaN(data.getQty())) {
        for(let item of this.storeItems) {
          if(item.getItemId() == data.getItemId()) {
            item.setQty(item.getQty() + data.getQty());
            return;
          }
        }
        this.storeItems.push(data);
        this.click = true;
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  addStore(): void {
    this.newStore?.setStoreName(this.name);
    this.newStore?.setStoreLocation(this.location);
    this.newStore?.setStoreItems(this.storeItems);
    if(this.name==='' || this.location==-1)
      this.newStore = null;
  }
}

