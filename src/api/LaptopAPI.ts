import React from "react";
import LaptopModel from "../models/LaptopModel";
import request from "./Request";

interface ResultPagingInterface {
    result: LaptopModel[];
    totalPages: number;
    totalLaptops: number;
}

async function takeLaptop(link: string): Promise<ResultPagingInterface> {
    const result: LaptopModel[] = [];

    const response = await request(link);

    const responseData = await response._embedded.laptops;

    const totalPages: number = response.page.totalPages;
    const totalLaptops: number = response.page.totalElements;

    for (const key in responseData) {
        const laptop = new LaptopModel(
            responseData[key].laptopID,
            responseData[key].laptopName,
            responseData[key].laptopQuantities,
            responseData[key].describer,
            responseData[key].importPrice,
            responseData[key].listedPrice,
            responseData[key].sellingPrice,
            responseData[key].randomMemory,
            responseData[key].upgradeAbilityRAM,
            responseData[key].weigh,
            responseData[key].colour,
            responseData[key].dimension,
            responseData[key].bluetooth,
            responseData[key].port,
            responseData[key].pin,
            responseData[key].upgradeAbilityDiskDrive,
            responseData[key].webcam,
            responseData[key].operatingSystem,
            responseData[key].displaySize,
            responseData[key].coating,
           
        );

        result.push(laptop);
    }
    return { result: result, totalPages: totalPages, totalLaptops: totalLaptops };
}

export async function takeAllLaptops(presentPage: number): Promise<ResultPagingInterface> {
    const endpoint: string = `http://14.225.205.7:8080/laptop?sort=laptopID,desc&size=10&page=${presentPage}`;
    return takeLaptop(endpoint);
}

export async function take3NewestLaptops(): Promise<ResultPagingInterface> {
    const endpoint: string = `http://14.225.205.7:8080/laptop?sort=laptopID,desc&size=3`;
    return takeLaptop(endpoint);
}

export async function take8MostExLaptop(): Promise<ResultPagingInterface> {
    const endpoint: string = `http://14.225.205.7:8080/laptop?sort=sellingPrice,desc&size=8`;
    return takeLaptop(endpoint);
}

export async function take10CheapExLaptop(): Promise<ResultPagingInterface> {
    const endpoint: string = `http://14.225.205.7:8080/laptop?sort=sellingPrice,asc&size=10`;
    return takeLaptop(endpoint);
}

export async function findBooks(keyWordFindBooks: string): Promise<ResultPagingInterface> {


    let endpoint = `http://14.225.205.7:8080/laptop/search/findByLaptopNameContaining?laptopName=${keyWordFindBooks}`;

    return takeLaptop(endpoint);
}

export async function findLaptopBrand(brandID: number): Promise<ResultPagingInterface> {
    let endpoint: string = `http://14.225.205.7:8080/laptop/search/findByBrand_BrandID?brandID=${brandID}`;
    return takeLaptop(endpoint);
}

export async function findLaptopByModel(modelID: number): Promise<ResultPagingInterface> {
    let endpoint: string = `http://14.225.205.7:8080/laptop/search/findByModel_ModelID?modelID=${modelID}`;
    return takeLaptop(endpoint);
}

export async function takeALaptopFromID(laptopID: number): Promise<LaptopModel | null> {
    const endpoint: string = `http://14.225.205.7:8080/laptop/${laptopID}`;


    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error('Error in calling API taking laptop');

        }
        const laptopData = await response.json();

        if (laptopData) {
            const laptop = new LaptopModel(
                laptopData.laptopID,
                laptopData.laptopName,
                laptopData.laptopQuantities,
                laptopData.describer,
                laptopData.importPrice,
                laptopData.listedPrice,
                laptopData.sellingPrice,
                laptopData.randomMemory,
                laptopData.upgradeAbilityRAM,
                laptopData.weigh,
                laptopData.colour,
                laptopData.dimension,
                laptopData.bluetooth,
                laptopData.port,
                laptopData.pin,
                laptopData.upgradeAbilityDiskDrive,
                laptopData.webcam,
                laptopData.operatingSystem,
                laptopData.displaySize,
                laptopData.coating,
                
            );

            return laptop;
        } else {
            throw new Error(`Don't exit this laptop!`);
        }

    } catch (error) {
        console.error("Error: ", error);
        return null;
    }

}
