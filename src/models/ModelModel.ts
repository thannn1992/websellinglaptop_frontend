class ModelModel {
    private modelName: string;
    private modelID: number;


    public getModelName(): string {
        return this.modelName;
    }

    public setModelName(modelName: string): void {
        this.modelName = modelName;
    }

    public getModelID(): number {
        return this.modelID;
    }

    public setModelID(modelID: number): void {
        this.modelID = modelID;
    }

    constructor(modelName: string, modelID: number) {
        this.modelName = modelName
        this.modelID = modelID
    }
}
export default ModelModel;