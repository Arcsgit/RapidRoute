import { Item } from "./item";

export class OrderItem {
    private srno: number;
    private item: Item|undefined;
    private qty: number;

    private static sr: number = -1;
    private static generateSr(): number { return ++OrderItem.sr; }

    constructor(name: string, qty: number) {
        this.srno = OrderItem.generateSr();
        this.item = Item.getItemByName(name);
        this.qty = qty;
        // console.log('orderitemconstructor : item = '+this.item?.displayItem());
    }

    public getItemId(): number|undefined {
        return this.item?.getItemId();
    }
    public getQty(): number {
        return this.qty;
    }
    public getItem(): Item|undefined {
        return this.item;
    }
}
