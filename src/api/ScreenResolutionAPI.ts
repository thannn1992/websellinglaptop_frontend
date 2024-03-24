import React from "react";

import request from "./Request";
import ScreenResolutionModel from "../models/ScreenResolutionModel";


async function takeScreenResolutionOfALaptop(endpoint: string): Promise<ScreenResolutionModel> {

    const response = await request(endpoint);
    const responseData = response;
    const result = new ScreenResolutionModel(
       

        responseData.screenResolutionID,
        responseData.screenResolutionName,
        responseData.colorAccuracy
        )
        return result;
}

export async function takeOneScreenOfOneLaptop(laptopID: number): Promise<ScreenResolutionModel> {
    const endpoint: string = `http://localhost:8080/laptop/${laptopID}/screenResolution`;
    return takeScreenResolutionOfALaptop(endpoint);
}
