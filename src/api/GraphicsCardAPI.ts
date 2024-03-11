import React from "react";
import PictureModel from "../models/PictureModel";
import request from "./Request";
import GraphicsCardModel from "../models/GraphicsCardModel";

async function takeGraphicsCardOfALaptop(endpoint:string): Promise<GraphicsCardModel[]> {
    const result: GraphicsCardModel[] = [];

    const response = await request(endpoint);

    const responseData = response._embedded.graphicsCards;

    for(const key in responseData){
        let graphicCard = new GraphicsCardModel(
            responseData[key].graphicsCardID,
            responseData[key].graphicsCardName,
            responseData[key].graphicsCardTye
        );
        result.push( graphicCard);
    }
return result;
}

export async function takeAllGraphicsCardOfOneLaptop(laptopID:number):Promise<GraphicsCardModel[]> {
    const endpoint:string = `http://localhost:8080/laptop/${laptopID}/listGraphicsCard?sort=graphicsCardID,asc`;
    return takeGraphicsCardOfALaptop(endpoint);
}