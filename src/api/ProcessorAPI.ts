import React from "react";
import ProcessorModel from "../models/ProcessorModel";
import request from "./Request";


async function takeAProcessorBackEnd(endpoint: string): Promise<ProcessorModel> {
    const response = await request(endpoint);
    const responseData = response;
    const result = new ProcessorModel(
        responseData.processorID,
        responseData.processorName,
        responseData.maxTurboFrequency,
        responseData.cache)
    return result;
}

async function takeAllProcessorBackEnd(endpoint: string): Promise<ProcessorModel[]> {
    const result: ProcessorModel[] = [];
    const response = await request(endpoint);
    const responseData = await response._embedded.processors;

    for (const key in responseData) {
        const processorModelItem = new ProcessorModel(
            responseData[key].processorID,
            responseData[key].processorName,
            responseData[key].maxTurboFrequency,
            responseData[key].cache
        )
        result.push(processorModelItem);
    }

    return result;
}

export async function takeOneProcessorOfOneLaptop(laptopID: number): Promise<ProcessorModel> {
    const endpoint: string = `http://localhost:8080/laptop/${laptopID}/processor`;
    return takeAProcessorBackEnd(endpoint);
}

export async function takeAllProcessor(): Promise<ProcessorModel[]> {
    const endpoint: string = `http://localhost:8080/processor`;
    return takeAllProcessorBackEnd(endpoint);
}

export async function takeOneProcessorByID(processorID: number): Promise<ProcessorModel> {
    const endpoint: string = `http://localhost:8080/processor/${processorID}`;
    return takeAProcessorBackEnd(endpoint);
}


