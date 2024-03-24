class BrandModel {
    private brandID: number;
    private brandName: string;

    public getbrandID(): number {
        return this.brandID;
    }

    public setbrandID(brandID: number): void {
        this.brandID = brandID;
    }

    public getbrandName(): string {
        return this.brandName;
    }

    public setbrandName(brandName: string): void {
        this.brandName = brandName;
    }

    constructor(brandID: number, brandName: string) {
        this.brandID = brandID
        this.brandName = brandName
    }


}
export default BrandModel;
