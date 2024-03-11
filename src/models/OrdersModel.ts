

class OrdesModel {
    private orderID: number;
    private orderPurchaseAddress: string;
    private receiveDate: string;
    private orderDate: string;
    private province: string;
    private district: string;
    private commune: string;
    private stressNameAndHouseNumber: string;
    private totalAmount: number;

    public getOrderID(): number {
        return this.orderID;
    }

    public setOrderID(orderID: number): void {
        this.orderID = orderID;
    }

    public getOrderPurchaseAddress(): string {
        return this.orderPurchaseAddress;
    }

    public setOrderPurchaseAddress(orderPurchaseAddress: string): void {
        this.orderPurchaseAddress = orderPurchaseAddress;
    }

    public getReceiveDate(): string {
        return this.receiveDate;
    }

    public setReceiveDate(receiveDate: string): void {
        this.receiveDate = receiveDate;
    }

    public getOrderDate(): string {
        return this.orderDate;
    }

    public setOrderDate(orderDate: string): void {
        this.orderDate = orderDate;
    }

    public getProvince(): string {
        return this.province;
    }

    public setProvince(province: string): void {
        this.province = province;
    }

    public getDistrict(): string {
        return this.district;
    }

    public setDistrict(district: string): void {
        this.district = district;
    }

    public getCommune(): string {
        return this.commune;
    }

    public setCommune(commune: string): void {
        this.commune = commune;
    }

    public getStressNameAndHouseNumber(): string {
        return this.stressNameAndHouseNumber;
    }

    public setStressNameAndHouseNumber(stressNameAndHouseNumber: string): void {
        this.stressNameAndHouseNumber = stressNameAndHouseNumber;
    }

    public getTotalAmount(): number {
        return this.totalAmount;
    }

    public setTotalAmount(totalAmount: number): void {
        this.totalAmount = totalAmount;
    }
    constructor(
        orderID: number,
        orderPurchaseAddress: string,
        receiveDate: string,
        orderDate: string,
        province: string,
        district: string,
        commune: string,
        stressNameAndHouseNumber: string,
        totalAmount: number
    ) {
        this.orderID = orderID
        this.orderPurchaseAddress = orderPurchaseAddress
        this.receiveDate = receiveDate
        this.orderDate = orderDate
        this.province = province
        this.district = district
        this.commune = commune
        this.stressNameAndHouseNumber = stressNameAndHouseNumber
        this.totalAmount = totalAmount
    }
}
export default OrdesModel;