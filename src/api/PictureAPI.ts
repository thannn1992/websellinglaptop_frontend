import React from "react";
import PictureModel from "../models/PictureModel";
import request from "./Request";

async function takePictureOfALaptop(endpoint:string): Promise<PictureModel[]> {
    const result: PictureModel[] = [];

    const response = await request(endpoint);

    const responseData = response._embedded.pictures;

    for(const key in responseData){
        let picture = new PictureModel(
            responseData[key].pictureID,
            responseData[key].icons,
            responseData[key].pictureName,
            responseData[key].pictureLink,
            responseData[key].pictureData
        );
        result.push(picture);
    }
return result;
}

export async function takeAllPictureOfOneLaptop(laptopID:number):Promise<PictureModel[]> {
    const endpoint:string = `http://localhost:8080/laptop/${laptopID}/listPictures`;
    return takePictureOfALaptop(endpoint);
}

export async function takeOnePictureOfOneLaptop(laptopID:number):Promise<PictureModel[]> {
    const endpoint:string = `http://localhost:8080/laptop/${laptopID}/listPictures?sort=pictureID,asc&page=0&size=1`;
    return takePictureOfALaptop(endpoint);
}
