class ScreenResolutionModel {
    private screenResolutionID: number;
    private screenResolutionName: string;
    private colorAccuracy: string;


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
        return this.colorAccuracy;
    }

    public setColorAccuraty(colorAccuracy: string): void {
        this.colorAccuracy = colorAccuracy;
    }
    constructor(screenResolutionID: number, screenResolutionName: string, colorAccuracy: string) {
        this.screenResolutionID = screenResolutionID
        this.screenResolutionName = screenResolutionName
        this.colorAccuracy = colorAccuracy
    }
}
export default ScreenResolutionModel;