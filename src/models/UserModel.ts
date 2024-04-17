class UserModel {
    private userID: number;
    private firstName: string;
    private lastName: string;
    private usersName: string;
    private password: string;
    private gender: number;
    private email: string;
    private phoneNumber: string;
    private birthDay: Date;
    private address: string;
    private deliveryAddress: string |undefined;
    private purchaseAddress: string | undefined;


    public getBirthDay(): Date {
        return this.birthDay;
    }

    public setBirthDay(birthDay: Date): void {
        this.birthDay = birthDay;
    }

    public getUserID(): number {
        return this.userID;
    }

    public setUserID(userID: number): void {
        this.userID = userID;
    }

    public getFirstName(): string {
        return this.firstName;
    }

    public setFirstName(firstName: string): void {
        this.firstName = firstName;
    }

    public getLastName(): string {
        return this.lastName;
    }

    public setLastName(lastName: string): void {
        this.lastName = lastName;
    }

    public getUsersName(): string {
        return this.usersName;
    }

    public setUsersName(usersName: string): void {
        this.usersName = usersName;
    }

    public getPassword(): string {
        return this.password;
    }

    public setPassword(password: string): void {
        this.password = password;
    }

    public getGender(): number {
        return this.gender;
    }

    public setGender(gender: number): void {
        this.gender = gender;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public getPhoneNumber(): string {
        return this.phoneNumber;
    }

    public setPhoneNumber(phoneNumber: string): void {
        this.phoneNumber = phoneNumber;
    }

    public getAddress(): string {
        return this.address;
    }

    public setAddress(address: string): void {
        this.address = address;
    }

    public getDeliveryAddress(): string |undefined {
        return this.deliveryAddress;
    }

    public setDeliveryAddress(deliveryAddress: string): void {
        this.deliveryAddress = deliveryAddress;
    }

    public getPurchaseAddress(): string |undefined {
        return this.purchaseAddress;
    }

    public setPurchaseAddress(purchaseAddress: string): void {
        this.purchaseAddress = purchaseAddress;
    }
    constructor(
        userID: number,
        firstName: string,
        lastName: string,
        usersName: string,
        password: string,
        gender: number,
        email: string,
        phoneNumber: string,
        birthDay:Date,
        address: string,
        deliveryAddress: string,
        purchaseAddress: string
    ) {
        this.userID = userID
        this.firstName = firstName
        this.lastName = lastName
        this.usersName = usersName
        this.password = password
        this.gender = gender
        this.email = email
        this.phoneNumber = phoneNumber
        this.birthDay = birthDay
        this.address = address
        this.deliveryAddress = deliveryAddress
        this.purchaseAddress = purchaseAddress
    }
}
export default UserModel;