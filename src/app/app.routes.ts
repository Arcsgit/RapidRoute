import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OrderPageComponent } from './order-page/order-page.component';
import { StorePageComponent } from './store-page/store-page.component';
import { MapComponent } from './map/map.component';
import { ContactComponent } from './contact/contact.component';

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'order-page',
        component: OrderPageComponent
    },
    {
        path: 'store-page',
        component: StorePageComponent
    },
    {
        path: 'map-page',
        component: MapComponent
    },
    {
        path: 'contact-page',
        component: ContactComponent
    },
    {
        path: '',
        component: HomeComponent
    }
    
];
