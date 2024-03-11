import React, { useEffect, useState } from "react";
import ReviewModel from "../../../models/ReviewModel";
import { takeAllReviewOfOneLaptop } from "../../../api/ReviewAPI";
import { renderRating } from "../../utils/StarRating";

interface ReviewLaptopInterface {
    laptopID: number;
}

export const ReviewLaptop: React.FC<ReviewLaptopInterface> = (prop) => {
    const laptopID: number = prop.laptopID;


    const [listReviewLaptop, setListReviewLaptop] = useState<ReviewModel[]>([]);
    const [upLoadingData, setUpLoadingData] = useState<boolean>(true);
    const [informError, setInformError] = useState(null);

    useEffect(() => {
        takeAllReviewOfOneLaptop(laptopID).then(
            result => {
                setListReviewLaptop(result);
                setUpLoadingData(false);
            }
        ).catch(
            error => {
                setUpLoadingData(false);
                setInformError(error.message);
            }
        );
    }, []

    )

    if (upLoadingData) {
        return (
            <div>
                <h1>
                    Uploading data!
                </h1>
            </div>
        )
    }

    if (informError) {
        return (
            <div>
                Error: {informError}
            </div>
        )
    }

    return (
        <div className="container mt-2 mb-2 text-center">
            <h4>Đánh giá sản phẩm</h4>
            {
                listReviewLaptop.map(
                    (review, index) => (
                        <div className="row">
                            <div className="col-4 text-end">
                                <p>{renderRating(review.getRating())}</p>
                            </div>
                            <div className="col-8 text-start">
                                <p>{review.getComment()}</p>
                            </div>
                        </div>
                    ))
            }
        </div>
    );

}