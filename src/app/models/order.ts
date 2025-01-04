import { OrderItem } from "./order-item";
import { Store } from "./store";
import { Vehicle } from "./vehicle";

export class Order {
    private orderId: number;
    private orderTime: string;
    private orderDate: string;
    public destination: number;
    private orderItems: OrderItem[];
    private store: Store | null;
    private vehicle: Vehicle | null;

    private static id: number = 0;
    private static generateId(): number { return ++Order.id; }
    
    constructor(orderItems: OrderItem[], destination: number) {
        this.orderId = Order.generateId();
        this.orderTime = new Date().toLocaleTimeString();
        this.orderDate = new Date().toDateString();
        this.destination = destination;
        this.orderItems = orderItems;
        this.store = null;
        this.vehicle = null;
    }

    public getOrderId(): number { 
        return this.orderId; 
    }
    public getOrderTime(): string { 
        return this.orderTime; 
    }
    public getOrderDate(): string { 
        return this.orderDate; 
    }
    public setDestination(destination: number): void {
        this.destination = destination; 
    }
    public getDestination(): number { 
        return this.destination; 
    }
    public getOrderItems(): OrderItem[] { 
        return this.orderItems; 
    }
    public getStores(): Store|null { 
        return this.store; 
    }
    public setStore(store: Store): void {
        this.store = store;
    }
    public getVehicleId(): number|undefined { 
        return this.vehicle?.getVehicleId(); 
    }

}
