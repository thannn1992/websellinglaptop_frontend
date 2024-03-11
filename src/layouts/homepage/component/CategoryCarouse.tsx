import React from "react";
import { Category } from "./Category";
import { Carousel } from "./Carousel";
import { Banner01 } from "./Banner01";

export const CategoryCarouse: React.FC = () => {
    return (
            <div className="CategoryCarouse">
                <div className="container">
                    <div className="CategoryCarouse-content">
                        <Category />
                        <Carousel />
                    </div>
                </div>
            </div>
    )
} 