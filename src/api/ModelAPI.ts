import React from "react";
import request from "./Request";
import ModelModel from "../models/ModelModel";

async function takeAModel(endpoint: string): Promise<ModelModel> {
    const response = await request(endpoint);
    const responseData = response;
    const result = new ModelModel(
        responseData.modelName,
        responseData.modelID,
        responseData.modelDescription
    )
    return result;
}

async function takeAllModel(endpoint: string): Promise<ModelModel[]> {
    const result: ModelModel[] = [];
    const response = await request(endpoint);
    const responseData = await response._embedded.models;
    for (const key in responseData) {
        const modelTemp = new ModelModel(
            responseData[key].modelName,
            responseData[key].modelID,
            responseData[key].modelDescription
        )
        result.push(modelTemp);
    };
    return result;
}

    export async function takeModelofALaptop(laptopID: number): Promise<ModelModel> {
        let endpoint = `http://14.225.205.7:8080/laptop/${laptopID}/model`;
        return takeAModel(endpoint);
    }

    export async function takeAllModelofABrand(modelID: number): Promise<ModelModel[]> {
        let endpoint = `http://14.225.205.7:8080/model/search/findByBrand_BrandID?brandID=${modelID}`;
        return takeAllModel(endpoint);

    }

    export async function takeModelFromID(modelID: number): Promise<ModelModel> {
        let endpoint = `http://14.225.205.7:8080/model/${modelID}`;
        return takeAModel(endpoint);
    }