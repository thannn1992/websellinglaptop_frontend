class DeliveryMethodModel {
    private detailOfOrdersID: number;
    private totalAmount: number;

    public getDetailOfOrdersID(): number {
        return this.detailOfOrdersID;
    }

    public setDetailOfOrdersID(detailOfOrdersID: number): void {
        this.detailOfOrdersID = detailOfOrdersID;
    }

    public getTotalAmount(): number {
        return this.totalAmount;
    }

    public setTotalAmount(totalAmount: number): void {
        this.totalAmount = totalAmount;
    }
    constructor(detailOfOrdersID: number, totalAmount: number) {
        this.detailOfOrdersID = detailOfOrdersID
        this.totalAmount = totalAmount
    }

}
export default DeliveryMethodModel;