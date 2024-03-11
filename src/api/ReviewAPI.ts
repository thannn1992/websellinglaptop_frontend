import React from "react";
import ReviewModel from "../models/ReviewModel";
import request from "./Request";
import PictureModel from "../models/PictureModel";

async function takeReviewOfOneLaptop(endpoint: string): Promise<ReviewModel[]> {

    const result: ReviewModel[] = [];

    const response = await request(endpoint);

    const responseData = await response._embedded.reviews

    for (const key in responseData) {

        let review = new ReviewModel(
            responseData[key].rating,
            responseData[key].comment,
            responseData[key].reviewID
             
        );
        result.push(review);

    }
    return result;
}

export async function takeAllReviewOfOneLaptop(laptopID:number) {
    const endpoint: string = `http://localhost:8080/laptop/${laptopID}/listReview`;

    return takeReviewOfOneLaptop(endpoint);
}