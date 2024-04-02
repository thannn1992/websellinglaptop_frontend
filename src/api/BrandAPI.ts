import React from "react";
import BrandModel from "../models/BrandModel";
import request from "./Request";

async function takeBrandofLaptop(endpoint: string): Promise<BrandModel> {
    const response = await request(endpoint);
    const responseData = response;
    const result = new BrandModel(
        responseData.brandID,
        responseData.brandName,
        responseData.brandDescription
    )
    return result;

}

export async function takeBrandofALaptop(laptopID: number): Promise<BrandModel> {
    let endpoint = `http://localhost:8080/laptop/${laptopID}/brand`;
    return takeBrandofLaptop(endpoint);
}

export async function takeBrandFromID(brandID: number): Promise<BrandModel> {
    let endpoint = `http://localhost:8080/brand/${brandID}`;
    return takeBrandofLaptop(endpoint);
}