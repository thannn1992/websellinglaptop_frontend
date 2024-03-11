class ScreenResolutionModel {
    private screenResolutionID: number;
    private screenResolutionName: string;
    private colorAccuraty: string;


    public getScreenResolutionID(): number {
        return this.screenResolutionID;
    }

    public setScreenResolutionID(screenResolutionID: number): void {
        this.screenResolutionID = screenResolutionID;
    }

    public getScreenResolutionName(): string {
        return this.screenResolutionName;
    }

    public setScreenResolutionName(screenResolutionName: string): void {
        this.screenResolutionName = screenResolutionName;
    }

    public getColorAccuraty(): string {
        return this.colorAccuraty;
    }

    public setColorAccuraty(colorAccuraty: string): void {
        this.colorAccuraty = colorAccuraty;
    }
    constructor(screenResolutionID: number, screenResolutionName: string, colorAccuraty: string) {
        this.screenResolutionID = screenResolutionID
        this.screenResolutionName = screenResolutionName
        this.colorAccuraty = colorAccuraty
    }
}
export default ScreenResolutionModel;