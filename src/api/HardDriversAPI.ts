import React from "react";
import request from "./Request";
import GraphicsCardModel from "../models/GraphicsCardModel";
import HardDriverModel from "../models/HardDriverModel";

async function takeHardDriversOfALaptop(endpoint:string): Promise<HardDriverModel[]> {
    const result: HardDriverModel[] = [];

    const response = await request(endpoint);

    const responseData = response._embedded.hardDrivers;

    for(const key in responseData){
        let hardDriver = new HardDriverModel(
            responseData[key].hardDriverID,
            responseData[key].hardDriverName,
            responseData[key].hardDriverType

        );
        result.push( hardDriver);
    }
return result;
}

export async function takeAllHardDriverOfOneLaptop(laptopID:number):Promise<HardDriverModel[]> {
    const endpoint:string = `http://localhost:8080/laptop/${laptopID}/listHardDriver?sort=hardDriverID,asc`;
    return takeHardDriversOfALaptop(endpoint);
}