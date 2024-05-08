import Districts from "../models/Districts";
import Wards from "../models/Wards";
import request from "./Request";

async function takeOneWard(endpoint:string): Promise<Wards[]> {
    const result: Wards[] = [];

    const response = await request(endpoint);

    const responseData = response._embedded.wardses;

    for(const key in responseData){
        let ward = new Wards(
            responseData[key].code,
            responseData[key].name,
            responseData[key].nameEn,
            responseData[key].fullName,
            responseData[key].fullNameEn,
            responseData[key].codeName,
            responseData[key].districtCode,
            responseData[key].administrativeUnitId
        );
        result.push(ward);
    }

return result;
}

export async function takeAllWardOfOneDistrict(districtID: string):Promise<Wards[]> {
    const endpoint:string = `http://14.225.205.7:8080/wards/search/findByDistrictCode?districtCode=${districtID}`;
    return takeOneWard(endpoint);
}

