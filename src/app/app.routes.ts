import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OrderPageComponent } from './order-page/order-page.component';

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
        path: '',
        component: HomeComponent
    }
    
];
