class DeliveryMethodModel {
    private deliveryMethodID: number;
    private deliveryMethodName: string;
    private description: string;
    private feeOfPayment: number;

    public getDeliveryMethodID(): number {
        return this.deliveryMethodID;
    }

    public setDeliveryMethodID(deliveryMethodID: number): void {
        this.deliveryMethodID = deliveryMethodID;
    }

    public getDeliveryMethodName(): string {
        return this.deliveryMethodName;
    }

    public setDeliveryMethodName(deliveryMethodName: string): void {
        this.deliveryMethodName = deliveryMethodName;
    }

    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public getFeeOfPayment(): number {
        return this.feeOfPayment;
    }

    public setFeeOfPayment(feeOfPayment: number): void {
        this.feeOfPayment = feeOfPayment;
    }
    constructor(
        deliveryMethodID: number,
        deliveryMethodName: string,
        description: string,
        feeOfPayment: number
    ) {
        this.deliveryMethodID = deliveryMethodID
        this.deliveryMethodName = deliveryMethodName
        this.description = description
        this.feeOfPayment = feeOfPayment
    }

}
export default DeliveryMethodModel