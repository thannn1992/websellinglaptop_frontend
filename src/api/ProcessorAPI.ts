import React from "react";
import ProcessorModel from "../models/ProcessorModel";
import request from "./Request";


async function takeProcessorOfALaptop(endpoint: string): Promise<ProcessorModel> {

    const response = await request(endpoint);
    const responseData = response;
    const result = new ProcessorModel(
        responseData.processorID,
        responseData.processorName,
        responseData.maxTurboFrequency,
        responseData.cache)
        return result;
}

export async function takeOneProcessorOfOneLaptop(laptopID: number): Promise<ProcessorModel> {
    const endpoint: string = `http://localhost:8080/laptop/${laptopID}/processor`;
    return takeProcessorOfALaptop(endpoint);
}

