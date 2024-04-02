import React from "react";
import ListLaptopAPI from "../product/ListLaptopAPI";
import { Carousel } from "./component/Carousel";
import { useParams } from "react-router-dom";
import { CategoryCarouse } from "./component/CategoryCarouse";
import { Banner01 } from "./component/Banner01";
import { SliderOutstandingLaptop } from "./component/SliderOutstandingLaptop";
import { Banner02 } from "./component/Banner02";
import { LaptopBestSelling } from "./component/LaptopBestSelling";

interface HomePagePropsInterface {
    
    keyWordFindLaptops: string;
}

function HomePage({ keyWordFindLaptops }: HomePagePropsInterface) {

    //take infor from link and assign for brandID
    const { brandID } = useParams();
    let brandIDNumber = 0;

    try {
        brandIDNumber = parseInt(brandID + '');

    } catch (error) {
        brandIDNumber = 0;
        console.error('Error: ', error);
    }
    if (Number.isNaN(brandIDNumber)) {
        brandIDNumber = 0;
    }
    return (
        <div className="" >
            <div className="background-color-main">
                <CategoryCarouse />
                <Banner01/>
                <SliderOutstandingLaptop/>
                <Banner02/>
                <LaptopBestSelling/>
                <ListLaptopAPI keyWordFindLaptops={keyWordFindLaptops} brandIDNumber={brandIDNumber} />
            </div>
        </div>
    );
}

export default HomePage