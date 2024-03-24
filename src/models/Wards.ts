class Wards {
    private code: string;
    private name: string;
    private nameEn: string;
    private fullName: string;
    private fullNameEn: string;
    private codeName: string;
    private districtCode: string;
    private administrativeUnitId: string;

    public getCode(): string {
        return this.code;
    }

    public setCode(code: string): void {
        this.code = code;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getNameEn(): string {
        return this.nameEn;
    }

    public setNameEn(nameEn: string): void {
        this.nameEn = nameEn;
    }

    public getFullName(): string {
        return this.fullName;
    }

    public setFullName(fullName: string): void {
        this.fullName = fullName;
    }

    public getFullNameEn(): string {
        return this.fullNameEn;
    }

    public setFullNameEn(fullNameEn: string): void {
        this.fullNameEn = fullNameEn;
    }

    public getCodeName(): string {
        return this.codeName;
    }

    public setCodeName(codeName: string): void {
        this.codeName = codeName;
    }

    public getDistrictCode(): string {
        return this.districtCode;
    }

    public setDistrictCode(districtCode: string): void {
        this.districtCode = districtCode;
    }

    public getAdministrativeUnitId(): string {
        return this.administrativeUnitId;
    }

    public setAdministrativeUnitId(administrativeUnitId: string): void {
        this.administrativeUnitId = administrativeUnitId;
    }
    constructor(
        code: string,
        name: string,
        nameEn: string,
        fullName: string,
        fullNameEn: string,
        codeName: string,
        districtCode: string,
        administrativeUnitId: string
    ) {
        this.code = code
        this.name = name
        this.nameEn = nameEn
        this.fullName = fullName
        this.fullNameEn = fullNameEn
        this.codeName = codeName
        this.districtCode = districtCode
        this.administrativeUnitId = administrativeUnitId
    }

}
export default Wards;