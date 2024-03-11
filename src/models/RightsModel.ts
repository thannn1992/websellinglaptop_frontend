class RightsModel {
    private rightID: number;
    private rightName: string;
    private rightDescription: string;
    
    public getRightID(): number {
        return this.rightID;
    }

    public setRightID(rightID: number): void {
        this.rightID = rightID;
    }

    public getRightName(): string {
        return this.rightName;
    }

    public setRightName(rightName: string): void {
        this.rightName = rightName;
    }

    public getRightDescription(): string {
        return this.rightDescription;
    }

    public setRightDescription(rightDescription: string): void {
        this.rightDescription = rightDescription;
    }
    constructor(rightID: number, rightName: string, rightDescription: string) {
        this.rightID = rightID
        this.rightName = rightName
        this.rightDescription = rightDescription
    }
}
export default RightsModel;