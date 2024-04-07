import React, { useEffect, useState } from "react";
import LaptopModel from "../../../models/LaptopModel";
import PictureModel from "../../../models/PictureModel";
import { takeOnePictureOfOneLaptop } from "../../../api/PictureAPI";
import { error } from "console";

interface CarouselItemAPIInterface {
    laptop: LaptopModel;
}

export const CarouselItem: React.FC<CarouselItemAPIInterface> = (prop) => {

    const laptopID = prop.laptop.getLaptopID();

    const [listPictures, setListPicture] = useState<PictureModel[]>([]);
    const [upLoadingData, setUpLoadingData] = useState<boolean>(true);
    const [informError, setInformError] = useState(null);

    useEffect(() => {
        takeOnePictureOfOneLaptop(laptopID).then(
            pictureData => {
                setListPicture(pictureData);
                setUpLoadingData(false)
            }
        ).catch(
            error => { setInformError(error); 
            }
        )
    },[]
    )

    if(upLoadingData){
        return(
            <div>
                <h1>Uploading data</h1>
            </div>
        )
    }

    if(informError){
        return (
            <div>
                <h1>Error: {informError}</h1>
            </div>
        )
    }

    return(
<div className="">
   
    <div className="">
        <img src={`${listPictures[0].getPictureData()}`} 
        // className="float-end"
        alt={prop.laptop.getLaptopName()
        }
        style={{height:'350px'}}
        />
    </div>
</div>
    )

}