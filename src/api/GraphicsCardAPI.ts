import React from "react";
import PictureModel from "../models/PictureModel";
import request from "./Request";
import GraphicsCardModel from "../models/GraphicsCardModel";



async function takeOneGraphicsCardBackEnd(endpoint: string): Promise<GraphicsCardModel> {
    const response = await request(endpoint);
    const responseData = response;
    const result = new GraphicsCardModel(
        responseData.graphicsCardID,
        responseData.graphicsCardName,
        responseData.graphicsCardTye
    )
    return result;
}

async function takeAllGraphicsCardOfOneLaptopBackEnd(endpoint:string): Promise<GraphicsCardModel[]> {
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
    const endpoint:string = `http://14.225.205.7:8080/laptop/${laptopID}/listGraphicsCard?sort=graphicsCardID,asc`;
    return takeAllGraphicsCardOfOneLaptopBackEnd(endpoint);
}


export async function takeOneGraphicsCardFromID(graphicCardID: number): Promise<GraphicsCardModel> {
    let endpoint = `http://14.225.205.7:8080/graphics-card/${graphicCardID}`;
    return takeOneGraphicsCardBackEnd(endpoint);
}

export async function takeAllGraphicsCard(): Promise<GraphicsCardModel[]> {
    let endpoint = `http://14.225.205.7:8080/graphics-card`;
    return takeAllGraphicsCardOfOneLaptopBackEnd(endpoint);
}

