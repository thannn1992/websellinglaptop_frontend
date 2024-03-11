class PictureModel {
    private pictureID: number;
    private icons: boolean;
    private pictureName: string;
    private pictureLink?: string;
    private pictureData: string;


    public getPictureID(): number {
        return this.pictureID;
    }

    public setPictureID(pictureID: number): void {
        this.pictureID = pictureID;
    }

    public isIcons(): boolean {
        return this.icons;
    }

    public setIcons(icons: boolean): void {
        this.icons = icons;
    }

    public getPictureName(): string {
        return this.pictureName;
    }

    public setPictureName(pictureName: string): void {
        this.pictureName = pictureName;
    }

    public getPictureLink(): string |undefined {
        return this.pictureLink;
    }

    public setPictureLink(pictureLink: string): void {
        this.pictureLink = pictureLink;
    }

    public getPictureData(): string {
        return this.pictureData;
    }

    public setPictureData(pictureData: string): void {
        this.pictureData = pictureData;
    }
    constructor(
        pictureID: number,
        icons: boolean,
        pictureName: string,
        pictureLink: string,
        pictureData: string
    ) {
        this.pictureID = pictureID
        this.icons = icons
        this.pictureName = pictureName
        this.pictureLink = pictureLink
        this.pictureData = pictureData
    }
}
export default PictureModel;