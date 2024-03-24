import React from "react";
import BrandModel from "../models/BrandModel";
import request from "./Request";

async function takeBrandofLaptop(endpoint: string): Promise<BrandModel> {
    const response = await request(endpoint);
    const responseData = response;
    const result = new BrandModel(
        responseData.brandID,
        responseData.brandName,
    )
    return result;

}

export async function takeBrandofALaptop(laptopID: number): Promise<BrandModel> {
    let endpoint = `http://localhost:8080/laptop/${laptopID}/brand`;
    return takeBrandofLaptop(endpoint);

}