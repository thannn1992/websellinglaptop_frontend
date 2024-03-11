class PaymentStatusModel {
    private paymentMethodName: string;
    private paymentID: number;
    private description: string;
    private feeOfPayment: number;


    public getPaymentMethodName(): string {
        return this.paymentMethodName;
    }

    public setPaymentMethodName(paymentMethodName: string): void {
        this.paymentMethodName = paymentMethodName;
    }

    public getPaymentID(): number {
        return this.paymentID;
    }

    public setPaymentID(paymentID: number): void {
        this.paymentID = paymentID;
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
        paymentMethodName: string,
        paymentID: number,
        description: string,
        feeOfPayment: number
    ) {
        this.paymentMethodName = paymentMethodName
        this.paymentID = paymentID
        this.description = description
        this.feeOfPayment = feeOfPayment
    }


}
export default PaymentStatusModel;