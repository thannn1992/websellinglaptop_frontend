class ItemsInCastModel {
    private itemsInCastID: number;
    private quantitiesItems: number;
    private sellingPrice?: number;

    public getItemsInCastID(): number {
        return this.itemsInCastID;
    }

    public setItemsInCastID(itemsInCastID: number): void {
        this.itemsInCastID = itemsInCastID;
    }

    public getQuantitiesItems(): number {
        return this.quantitiesItems;
    }

    public setQuantitiesItems(quantitiesItems: number): void {
        this.quantitiesItems = quantitiesItems;
    }

    public getSellingPrice(): number | undefined {
        return this.sellingPrice;
    }

    public setSellingPrice(sellingPrice?: number): void {
        this.sellingPrice = sellingPrice;
    }

    constructor(itemsInCastID: number, quantitiesItems: number, sellingPrice: number) {
        this.itemsInCastID = itemsInCastID
        this.quantitiesItems = quantitiesItems
        this.sellingPrice = sellingPrice
    }

}
export default ItemsInCastModel;