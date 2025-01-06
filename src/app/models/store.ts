import { StoreItems } from "./store-items";

export class Store {
    private storeID: number;
    private storeName: string;
    private storeLocation: number;
    private storeItems: StoreItems[] = [];

    private static id: number = 0;
    private static generateId(): number { return ++Store.id; }
    
    constructor(name: string, location: number, itemsCount: number) {
        this.storeID = Store.generateId();
        this.storeName = name;
        this.storeLocation = location;
        // for(let i = 0; i < itemsCount; i++) {
        //     let found: boolean = false;
        //     for(let j=0; j < this.storeItems.length; j++) {
        //         if(this.storeItems[j].getItemName() === 'Book') {
        //             found = true;
        //             this.storeItems[j].setItemQty(10);
        //             break;
        //         }
        //     }
        //     if(!found)
        //         this.storeItems.push(new StoreItems('Book', 10)); //Name, quantity
        // }
        this.storeItems.push(new StoreItems('Pen', 30)); //Name, quantity
        this.storeItems.push(new StoreItems('Toothbrush', 30)); //Name, quantity
        this.storeItems.push(new StoreItems('Book', 30)); //Name, quantity
        // this.storeItems.push(new StoreItems('Onion', 30)); //Name, quantity
        this.storeItems.push(new StoreItems('Biscuit', 30)); //Name, quantity
        this.storeItems.push(new StoreItems('Tomato', 30)); //Name, quantity
        this.storeItems.push(new StoreItems('Carrot', 30)); //Name, quantity
        this.storeItems.push(new StoreItems('Milk', 30)); //Name, quantity
        this.storeItems.push(new StoreItems('Apple', 30)); //Name, quantity
        this.storeItems.push(new StoreItems('Banana', 30)); //Name, quantity
        this.storeItems.push(new StoreItems('Orange', 30)); //Name, quantity
        this.storeItems.push(new StoreItems('Grapes', 30)); //Name, quantity
        this.storeItems.push(new StoreItems('Wheat', 30)); //Name, quantity
        this.storeItems.push(new StoreItems('Rice', 30)); //Name, quantity
        this.storeItems.push(new StoreItems('Chips', 30)); //Name, quantity
        this.storeItems.push(new StoreItems('Pineapple', 30)); //Name, quantity
    }
    public getStoreID(): number { return this.storeID; }
    public getStoreName(): string { return this.storeName; }
    public getStoreLocation(): number { return this.storeLocation; }
    public getStoreItems(): StoreItems[] { return this.storeItems; }
}
