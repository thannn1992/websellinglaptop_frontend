import Provinces from "../models/Provinces";
import request from "./Request";

async function takeOneProvinces(endpoint:string): Promise<Provinces[]> {
    const result: Provinces[] = [];

    const response = await request(endpoint);

    const responseData = response._embedded.provinceses;

    for(const key in responseData){
        let provinces = new Provinces(
            responseData[key].code,
            responseData[key].name,
            responseData[key].nameEn,
            responseData[key].fullName,
            responseData[key].fullNameEn,
            responseData[key].codeName,
            responseData[key].administrativeUnitId,
            responseData[key].administrativeRegionId
        );
        result.push(provinces);
    }

return result;
}

export async function takeAllProvinces():Promise<Provinces[]> {
    const endpoint:string = `http://localhost:8080/provinces?sort=name,asc&size=70`;
    return takeOneProvinces(endpoint);
}

