import React from "react";

import request from "./Request";
import ScreenResolutionModel from "../models/ScreenResolutionModel";


async function takeOneScreenResolution(endpoint: string): Promise<ScreenResolutionModel> {
    const response = await request(endpoint);
    const responseData = response;
    const result = new ScreenResolutionModel(
        responseData.screenResolutionID,
        responseData.screenResolutionName,
        responseData.colorAccuracy
        )
        return result;
}

async function takeAllScreenResolutionBackEnd(endpoint: string): Promise<ScreenResolutionModel[]> {
    const result: ScreenResolutionModel[] = [];
    const response = await request(endpoint);
    const responseData = await response._embedded.screenResolutions;

    for (const key in responseData) {
        const screenResolutionsItem = new ScreenResolutionModel(
            responseData[key].screenResolutionID,
            responseData[key].screenResolutionName,
            responseData[key].colorAccuracy,
        )
        result.push(screenResolutionsItem);
    }
    return result;
}

export async function takeOneScreenOfOneLaptop(laptopID: number): Promise<ScreenResolutionModel> {
    const endpoint: string = `http://localhost:8080/laptop/${laptopID}/screenResolution`;
    return takeOneScreenResolution(endpoint);
}

export async function takeAllScreenResolution(): Promise<ScreenResolutionModel[]> {
    const endpoint: string = `http://localhost:8080/screen-resolution`;
    return takeAllScreenResolutionBackEnd(endpoint);
}

export async function takeOneScreenByID(screenResolutionID: number): Promise<ScreenResolutionModel> {
    const endpoint: string = `http://localhost:8080/screen-resolution/${screenResolutionID}`;
    return takeOneScreenResolution(endpoint);
}






