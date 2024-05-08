import Districts from "../models/Districts";
import Provinces from "../models/Provinces";
import request from "./Request";

async function takeOneDistrict(endpoint:string): Promise<Districts[]> {
    const result: Districts[] = [];

    const response = await request(endpoint);

    const responseData = response._embedded.districtses;

    for(const key in responseData){
        let districts = new Districts(
            responseData[key].code,
            responseData[key].name,
            responseData[key].nameEn,
            responseData[key].fullName,
            responseData[key].fullNameEn,
            responseData[key].codeName,
            responseData[key].provinceCode,
            responseData[key].administrativeUnitId
            
        );
        result.push(districts);
    }

return result;
}

export async function takeAllDistrictOfOneProvince(provinceID: string):Promise<Districts[]> {
    const endpoint:string = `http://14.225.205.7:8080/districts/search/findByProvinceCode?provinceCode=${provinceID}`;
    return takeOneDistrict(endpoint);
}

