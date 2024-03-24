import React from "react";
import request from "./Request";
import ModelModel from "../models/ModelModel";

async function takeModelofLaptop(endpoint: string): Promise<ModelModel> {
    const response = await request(endpoint);
    const responseData = response;
    const result = new ModelModel(
        responseData.modelName,
        responseData.modelID,
    )
    return result;

}

export async function takeModelofALaptop(laptopID: number): Promise<ModelModel> {
    let endpoint = `http://localhost:8080/laptop/${laptopID}/model`;
    return takeModelofLaptop(endpoint);

}