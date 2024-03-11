class ProcessorModel {
    private processorID: number;
    private processorName: string;
    private maxTurboFrequency: string;
    private cache: string;


    public getProcessorID(): number {
        return this.processorID;
    }

    public setProcessorID(processorID: number): void {
        this.processorID = processorID;
    }

    public getProcessorName(): string {
        return this.processorName;
    }

    public setProcessorName(processorName: string): void {
        this.processorName = processorName;
    }

    public getMaxTurboFrequency(): string {
        return this.maxTurboFrequency;
    }

    public setMaxTurboFrequency(maxTurboFrequency: string): void {
        this.maxTurboFrequency = maxTurboFrequency;
    }

    public getCache(): string {
        return this.cache;
    }

    public setCache(cache: string): void {
        this.cache = cache;
    }
    constructor(
        processorID: number,
        processorName: string,
        maxTurboFrequency: string,
        cache: string
    ) {
        this.processorID = processorID
        this.processorName = processorName
        this.maxTurboFrequency = maxTurboFrequency
        this.cache = cache
    }
}
export default ProcessorModel;