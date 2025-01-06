export class Item {
    private itemId: number;
    private itemName: string;

    private static itemList: Map<string, Item> = new Map();
    private static id: number = 0;
    private static generateId(): number { return ++Item.id; }
    static {
        Item.itemList.set("Pen", new Item('Pen'));
        Item.itemList.set("Toothbrush", new Item('Toothbrush'));
        Item.itemList.set("Book", new Item('Book'));
        Item.itemList.set("Biscuit", new Item('Biscuit'));
        Item.itemList.set("Onion", new Item('Onion',));
        Item.itemList.set("Tomato", new Item('Tomato'));
        Item.itemList.set("Carrot", new Item('Carrot'));
        Item.itemList.set("Milk", new Item('Milk'));
        Item.itemList.set("Apple", new Item('Apple'));
        Item.itemList.set("Banana", new Item('Banana'));
        Item.itemList.set("Orange", new Item('Orange'));
        Item.itemList.set("Grapes", new Item('Grapes'));
        Item.itemList.set("Wheat", new Item('Wheat'));
        Item.itemList.set("Rice", new Item('Rice'));
        Item.itemList.set("Chips", new Item('Chips'));
        Item.itemList.set("Pineapple", new Item('Pineapple'));
    }
    public static getItemByName(name: string): Item|undefined {
        return Item.itemList.get(name);
    }

    public static getAllItems(): Item[] {
        return Array.from(Item.itemList.values());
    }

    constructor(name: string) {
        this.itemId = Item.generateId();
        this.itemName = name;
    }

    public getItemName(): string { return this.itemName; }
    public getItemId(): number { return this.itemId; }
    public setItemName(name: string): void { this.itemName = name; }
    public displayItem(): string { return `Item ID: ${this.itemId}, Item Name: ${this.itemName}`; }
}
