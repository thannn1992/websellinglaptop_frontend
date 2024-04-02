class BrandModel {
    private brandID: number;
    private brandName: string;
    private brandDescription: string;

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

    public getbrandDescription(): string {
        return this.brandDescription;
    }

    public setbrandDescription(brandDescription: string): void {
        this.brandDescription = brandDescription;
    }

    constructor(brandID: number, brandName: string, brandDescription: string) {
        this.brandID = brandID;
        this.brandName = brandName;
        this.brandDescription = brandDescription;
    }


}
export default BrandModel;
