class LaptopModel {
    private laptopID: number;
    private laptopName: string;
    private laptopQuantities: number;
    private describer: string;
    private importPrice: number;
    private listedPrice: number;
    private sellingPrice: number;
    private randomMemory: string;
    private upgradeAbilityRAM: string;
    private weigh: string;
    private colour: string;
    private dimension: string;
    private bluetooth: string;
    private port: string;
    private pin: string;
    private upgradeAbilityDiskDrive: string;
    private webcam: string;
    private operatingSystem: string;
    private displaySize: string;
    private coating: string;


    public getLaptopID(): number {
        return this.laptopID;
    }

    public setLaptopID(laptopID: number): void {
        this.laptopID = laptopID;
    }

    public getLaptopName(): string {
        return this.laptopName;
    }

    public setLaptopName(laptopName: string): void {
        this.laptopName = laptopName;
    }

    public getLaptopQuantities(): number {
        return this.laptopQuantities;
    }

    public setLaptopQuantities(laptopQuantities: number): void {
        this.laptopQuantities = laptopQuantities;
    }

    public getDescriber(): string {
        return this.describer;
    }

    public setDescriber(describer: string): void {
        this.describer = describer;
    }

    public getImportPrice(): number {
        return this.importPrice;
    }

    public setImportPrice(importPrice: number): void {
        this.importPrice = importPrice;
    }

    public getListedPrice(): number {
        return this.listedPrice;
    }

    public setListedPrice(listedPrice: number): void {
        this.listedPrice = listedPrice;
    }

    public getSellingPrice(): number {
        return this.sellingPrice;
    }

    public setSellingPrice(sellingPrice: number): void {
        this.sellingPrice = sellingPrice;
    }

    public getRandomMemory(): string {
        return this.randomMemory;
    }

    public setRandomMemory(randomMemory: string): void {
        this.randomMemory = randomMemory;
    }

    public getUpgradeAbilityRAM(): string {
        return this.upgradeAbilityRAM;
    }

    public setUpgradeAbilityRAM(upgradeAbilityRAM: string): void {
        this.upgradeAbilityRAM = upgradeAbilityRAM;
    }

    public getWeigh(): string {
        return this.weigh;
    }

    public setWeigh(weigh: string): void {
        this.weigh = weigh;
    }

    public getColour(): string {
        return this.colour;
    }

    public setColour(colour: string): void {
        this.colour = colour;
    }

    public getDimension(): string {
        return this.dimension;
    }

    public setDimension(dimension: string): void {
        this.dimension = dimension;
    }

    public getBluetooth(): string {
        return this.bluetooth;
    }

    public setBluetooth(bluetooth: string): void {
        this.bluetooth = bluetooth;
    }

    public getPort(): string {
        return this.port;
    }

    public setPort(port: string): void {
        this.port = port;
    }

    public getPin(): string {
        return this.pin;
    }

    public setPin(pin: string): void {
        this.pin = pin;
    }

    public getUpgradeAbilityDiskDrive(): string {
        return this.upgradeAbilityDiskDrive;
    }

    public setUpgradeAbilityDiskDrive(upgradeAbilityDiskDrive: string): void {
        this.upgradeAbilityDiskDrive = upgradeAbilityDiskDrive;
    }

    public getWebcam(): string {
        return this.webcam;
    }

    public setWebcam(webcam: string): void {
        this.webcam = webcam;
    }

    public getOperatingSystem(): string {
        return this.operatingSystem;
    }

    public setOperatingSystem(operatingSystem: string): void {
        this.operatingSystem = operatingSystem;
    }

    public getDisplaySize(): string {
        return this.displaySize;
    }

    public setDisplaySize(displaySize: string): void {
        this.displaySize = displaySize;
    }

    public getCoating(): string {
        return this.coating;
    }

    public setCoating(coating: string): void {
        this.coating = coating;
    }

    

    constructor(
        laptopID: number,
        laptopName: string,
        laptopQuantities: number,
        describer: string,
        importPrice: number,
        listedPrice: number,
        sellingPrice: number,
        randomMemory: string,
        upgradeAbilityRAM: string,
        weigh: string,
        colour: string,
        dimension: string,
        bluetooth: string,
        port: string,
        pin: string,
        upgradeAbilityDiskDrive: string,
        webcam: string,
        operatingSystem: string,
        displaySize: string,
        coating: string
    ) {
        this.laptopID = laptopID
        this.laptopName = laptopName
        this.laptopQuantities = laptopQuantities
        this.describer = describer
        this.importPrice = importPrice
        this.listedPrice = listedPrice
        this.sellingPrice = sellingPrice
        this.randomMemory = randomMemory
        this.upgradeAbilityRAM = upgradeAbilityRAM
        this.weigh = weigh
        this.colour = colour
        this.dimension = dimension
        this.bluetooth = bluetooth
        this.port = port
        this.pin = pin
        this.upgradeAbilityDiskDrive = upgradeAbilityDiskDrive
        this.webcam = webcam
        this.operatingSystem = operatingSystem
        this.displaySize = displaySize
        this.coating = coating
    }
}
export default LaptopModel;