class HardDriverModel {
    private hardDriverID: number;
    private hardDriverName: string;
    private hardDriverType: string;

    public getHardDriverID(): number {
        return this.hardDriverID;
    }

    public setHardDriverID(hardDriverID: number): void {
        this.hardDriverID = hardDriverID;
    }

    public getHardDriverName(): string {
        return this.hardDriverName;
    }

    public setHardDriverName(hardDriverName: string): void {
        this.hardDriverName = hardDriverName;
    }

    public getHardDriverType(): string {
        return this.hardDriverType;
    }

    public setHardDriverType(hardDriverType: string): void {
        this.hardDriverType = hardDriverType;
    }
    constructor(hardDriverID: number, hardDriverName: string, hardDriverType: string) {
        this.hardDriverID = hardDriverID
        this.hardDriverName = hardDriverName
        this.hardDriverType = hardDriverType
    }


}
export default HardDriverModel;