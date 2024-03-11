class CastModel {
    private castID: number;
    private createDate: string;
    private purchaseAddress: string;
    private deliveryAddress: string;
    private totalPrice: number;
    private totalAmount: number;

    public getCastID(): number {
        return this.castID;
    }

    public setCastID(castID: number): void {
        this.castID = castID;
    }

    public getCreateDate(): string {
        return this.createDate;
    }

    public setCreateDate(createDate: string): void {
        this.createDate = createDate;
    }

    public getPurchaseAddress(): string {
        return this.purchaseAddress;
    }

    public setPurchaseAddress(purchaseAddress: string): void {
        this.purchaseAddress = purchaseAddress;
    }

    public getDeliveryAddress(): string {
        return this.deliveryAddress;
    }

    public setDeliveryAddress(deliveryAddress: string): void {
        this.deliveryAddress = deliveryAddress;
    }

    public getTotalPrice(): number {
        return this.totalPrice;
    }

    public setTotalPrice(totalPrice: number): void {
        this.totalPrice = totalPrice;
    }

    public getTotalAmount(): number {
        return this.totalAmount;
    }

    public setTotalAmount(totalAmount: number): void {
        this.totalAmount = totalAmount;
    }

    constructor(
        castID: number,
        createDate: string,
        purchaseAddress: string,
        deliveryAddress: string,
        totalPrice: number,
        totalAmount: number
    ) {
        this.castID = castID
        this.createDate = createDate
        this.purchaseAddress = purchaseAddress
        this.deliveryAddress = deliveryAddress
        this.totalPrice = totalPrice
        this.totalAmount = totalAmount
    }

}
export default CastModel;