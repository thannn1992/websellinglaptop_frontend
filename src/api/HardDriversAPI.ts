import React from "react";
import request from "./Request";
import GraphicsCardModel from "../models/GraphicsCardModel";
import HardDriverModel from "../models/HardDriverModel";


async function takeOneHardDriversBackEnd(endpoint: string): Promise<HardDriverModel> {
    const response = await request(endpoint);
    const responseData = response;
    const result = new HardDriverModel(
        responseData.hardDriverID,
        responseData.hardDriverName,
        responseData.hardDriverType
    )
    return result;
}

async function takeAllHardDriversBackEnd(endpoint: string): Promise<HardDriverModel[]> {
    const result: HardDriverModel[] = [];

    const response = await request(endpoint);

    const responseData = response._embedded.hardDrivers;

    for (const key in responseData) {
        let hardDriver = new HardDriverModel(
            responseData[key].hardDriverID,
            responseData[key].hardDriverName,
            responseData[key].hardDriverType

        );
        result.push(hardDriver);
    }
    return result;
}

export async function takeAllHardDriverOfOneLaptop(laptopID: number): Promise<HardDriverModel[]> {
    const endpoint: string = `http://localhost:8080/laptop/${laptopID}/listHardDriver?sort=hardDriverID,asc`;
    return takeAllHardDriversBackEnd(endpoint);
}

export async function takeOneHardDriverFromID(hardDriverID: number): Promise<HardDriverModel> {
    let endpoint = `http://localhost:8080/hard-driver/${hardDriverID}`;
    return takeOneHardDriversBackEnd(endpoint);
}

export async function takeAllHardDriver(): Promise<HardDriverModel[]> {
    let endpoint = `http://localhost:8080/hard-driver`;
    return takeAllHardDriversBackEnd(endpoint);
}
