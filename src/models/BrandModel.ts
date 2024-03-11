class BrandModel {
    private _brand_ID: number;
    private _brand_Name: string;

    public get_brand_ID(): number {
        return this._brand_ID;
    }

    public set_brand_ID(_brand_ID: number): void {
        this._brand_ID = _brand_ID;
    }

    public get_brand_Name(): string {
        return this._brand_Name;
    }

    public set_brand_Name(_brand_Name: string): void {
        this._brand_Name = _brand_Name;
    }

    constructor(brand_ID: number, brand_Name: string) {
        this._brand_ID = brand_ID
        this._brand_Name = brand_Name
    }


}
export default BrandModel;
