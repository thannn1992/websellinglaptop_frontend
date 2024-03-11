class OrderStatusModel {
    private orderStatusName: string;
    private orderStatusID: number;


    public getOrderStatusName(): string {
        return this.orderStatusName;
    }

    public setOrderStatusName(orderStatusName: string): void {
        this.orderStatusName = orderStatusName;
    }

    public getOrderStatusID(): number {
        return this.orderStatusID;
    }

    public setOrderStatusID(orderStatusID: number): void {
        this.orderStatusID = orderStatusID;
    }
    constructor(orderStatusName: string, orderStatusID: number) {
        this.orderStatusName = orderStatusName
        this.orderStatusID = orderStatusID
    }
}
export default OrderStatusModel;