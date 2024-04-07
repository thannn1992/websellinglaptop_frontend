class ModelModel {
    private modelName: string;
    private modelID: number;
    private modelDescription: string;


  
    public getModelDescription(): string {
        return this.modelDescription;
    }

    public setModelDescription(modelDescription: string): void {
        this.modelDescription = modelDescription;
    }


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

    constructor(modelName: string, modelID: number, modelDescription: string) {
        this.modelName = modelName;
        this.modelID = modelID;
        this.modelDescription = modelDescription;
    }
}
export default ModelModel;