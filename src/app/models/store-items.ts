import { Item } from "./item";

export class StoreItems {
    private srno: number;
    private item: Item | undefined;
    private qty: number;

    private static sr: number = 0;
    private static generateSr(): number { return ++StoreItems.sr; }
    
    constructor(itemName: string, qty: number) {
        this.srno = StoreItems.generateSr();
        this.item = Item.getItemByName(itemName);
        this.qty = qty;
    }
    
    public getSrno(): number { return this.srno; }
    public getItem(): Item|undefined { return this.item; }
    public getItemName(): string|undefined { return this.item?.getItemName(); }
    public getItemId(): number|undefined { return this.item?.getItemId(); }
    public setQty(qty: number): void { this.qty = qty; }
    public getQty(): number { return this.qty; }

}
