import PictureModel from "./PictureModel";

class CartItemModel {

    private produceID: number;
    private produceName: string;
    private produceSellingPrice: number;
    private produceQty: number;
    private produceThumbnail: PictureModel;

    public getProduceID(): number {
        return this.produceID;
    }

    public setProduceID(produceID: number): void {
        this.produceID = produceID;
    }

    public getProduceName(): string {
        return this.produceName;
    }

    public setProduceName(produceName: string): void {
        this.produceName = produceName;
    }

    public getProduceSellingPrice(): number {
        return this.produceSellingPrice;
    }

    public setProduceSellingPrice(produceSellingPrice: number): void {
        this.produceSellingPrice = produceSellingPrice;
    }

    public getProduceQty(): number {
        return this.produceQty;
    }

    public setProduceQty(produceQty: number): void {
        this.produceQty = produceQty;
    }

    public getProduceThumbnail(): PictureModel {
        return this.produceThumbnail;
    }

    public setProduceThumbnail(produceThumbnail: PictureModel): void {
        this.produceThumbnail = produceThumbnail;
    }

    constructor(
        produceID: number,
        produceName: string,
        produceSellingPrice: number,
        produceQty: number,
        produceThumbnail: PictureModel
    ) {
        this.produceID = produceID
        this.produceName = produceName
        this.produceSellingPrice = produceSellingPrice
        this.produceQty = produceQty
        this.produceThumbnail = produceThumbnail
    }


}
export default CartItemModel;