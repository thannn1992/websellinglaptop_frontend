class GraphicsCardModel {
    private graphicsCardID: number;
    private graphicsCardName: string;
    private graphicsCardTye: string;

    public getGraphicsCardID(): number {
        return this.graphicsCardID;
    }

    public setGraphicsCardID(graphicsCardID: number): void {
        this.graphicsCardID = graphicsCardID;
    }

    public getGraphicsCardName(): string {
        return this.graphicsCardName;
    }

    public setGraphicsCardName(graphicsCardName: string): void {
        this.graphicsCardName = graphicsCardName;
    }

    public getGraphicsCardTye(): string {
        return this.graphicsCardTye;
    }

    public setGraphicsCardTye(graphicsCardTye: string): void {
        this.graphicsCardTye = graphicsCardTye;
    }
    constructor(graphicsCardID: number, graphicsCardName: string, graphicsCardTye: string) {
        this.graphicsCardID = graphicsCardID
        this.graphicsCardName = graphicsCardName
        this.graphicsCardTye = graphicsCardTye
    }

}
export default GraphicsCardModel;