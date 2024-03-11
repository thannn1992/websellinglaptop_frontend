import React, { useEffect, useState } from "react";
import PictureModel from "../../../models/PictureModel";
import { takeAllPictureOfOneLaptop } from "../../../api/PictureAPI";
import { error } from "console";
import { Carousel } from "react-responsive-carousel";

interface BookPicturesInterface{
    laptopID: number;
}

export const LaptopPictures: React.FC<BookPicturesInterface> = (prop) =>{

    const laptopID: number = prop.laptopID;

    const [listPicturesLaptop, setListPictureLaptop] = useState<PictureModel[]>([]);
    const [upLoadingData, setUpLoadingData] = useState<boolean>(true);
    const [informError, setInformError] = useState(null);

    useEffect(()=>{
        takeAllPictureOfOneLaptop(laptopID).then(
            pictureDate => {
                setListPictureLaptop(pictureDate);
                setUpLoadingData(false);
            }
        ).catch(
            error => {
                setInformError(error.message);
            }
        )
    },[]
    )

    if(upLoadingData){
        return(
            <div>
                <h1>
                    Uploading data!
                </h1>
            </div>
        )
    }

    if(informError){
        return(
            <div>
                 Error: {informError}
            </div>
        )
    }

    return(
        <div className="row">
            <div className="col-12">
               <Carousel showArrows={true} showIndicators={true}>
                {
                    listPicturesLaptop.map(
                        (picture, index) =>(
                            <div key={index}>
                                    <img src={picture.getPictureData()} alt={`${picture.getPictureName()}`} style={{maxWidth:'250px'}} />
                            </div>
                        )
                    )
                }
               </Carousel>
            </div>
        </div>
    )
}