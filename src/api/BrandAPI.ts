import React from "react";
import BrandModel from "../models/BrandModel";
import request from "./Request";

async function takeOneBrandBackEnd(endpoint: string): Promise<BrandModel> {
    const response = await request(endpoint);
    const responseData = response;
    const result = new BrandModel(
        responseData.brandID,
        responseData.brandName,
        responseData.brandDescription
    )
    return result;
}

async function takeAllBrandBackEnd(endpoint: string): Promise<BrandModel[]> {
    const result: BrandModel[] = [];
    const response = await request(endpoint);
    const responseData = await response._embedded.brands;

    for(const key in responseData){
        const brandModelTem = new BrandModel(
            responseData[key].brandID,
            responseData[key].brandName,
            responseData[key].brandDescription
        )
        result.push(brandModelTem);
    }

    return result;
}


export async function takeBrandofALaptop(laptopID: number): Promise<BrandModel> {
    let endpoint = `http://14.225.205.7:8080/laptop/${laptopID}/brand`;
    return takeOneBrandBackEnd(endpoint);
}

export async function takeBrandFromID(brandID: number): Promise<BrandModel> {
    let endpoint = `http://14.225.205.7:8080/brand/${brandID}`;
    return takeOneBrandBackEnd(endpoint);
}

export async function takeAllBrand(): Promise<BrandModel[]> {
    let endpoint = `http://14.225.205.7:8080/brand?sort=brandID,arc`;
    return takeAllBrandBackEnd(endpoint);
}

