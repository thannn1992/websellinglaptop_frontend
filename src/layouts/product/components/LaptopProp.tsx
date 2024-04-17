import React, { useEffect, useState } from "react";
import LaptopModel from "../../../models/LaptopModel";
import PictureModel from "../../../models/PictureModel";
import { Link } from "react-router-dom";
import { takeAllPictureOfOneLaptop } from "../../../api/PictureAPI";
import { formatNumber } from "../../utils/FormatNumber";
import { takeOneProcessorOfOneLaptop } from "../../../api/ProcessorAPI";
import ProcessorModel from "../../../models/ProcessorModel";
import GraphicsCardModel from "../../../models/GraphicsCardModel";
import { takeAllGraphicsCardOfOneLaptop } from "../../../api/GraphicsCardAPI";
import HardDriverModel from "../../../models/HardDriverModel";
import { takeAllHardDriverOfOneLaptop } from "../../../api/HardDriversAPI";
import { useShoppingContext } from "../../../contexts/ShoppingContextProvider";
import ReviewModel from "../../../models/ReviewModel";
import { takeAllReviewOfOneLaptop } from "../../../api/ReviewAPI";
import { renderRating } from "../../utils/StarRating";
import useInformDialogContext from "../../../contexts/InformContextProvider";


interface LaptopPropAPIInterface {
    laptop: LaptopModel;
}

const LaptopPropAPI: React.FC<LaptopPropAPIInterface> = (props) => {

    const {handleShowNotification} = useInformDialogContext();

    const laptopID = props.laptop.getLaptopID();
    const listedPrice: number = props.laptop.getListedPrice();
    const sellingPrice: number = props.laptop.getSellingPrice();
    const percentDiscout = Math.round((1 - sellingPrice / listedPrice) * 100);
    const [review, setReview] = useState<ReviewModel[]>([]);
    const [totalReviews, setTotalReviews] = useState<number>(0);
    const [avaragePointsReview, setAvaragePointReview] = useState<number>(0);
    const [reviewCheck, setReviewCheck] = useState<string>();

    const [listPictures, setListPictures] = useState<PictureModel[]>([]);
    const [processorModels, setProcessorModels] = useState<ProcessorModel>();
    const [graphicsCard, setGraphicsCard] = useState<GraphicsCardModel[]>([]);
    const [hardDriver, setHardDriver] = useState<HardDriverModel[]>([]);
    const [upLoadingData, setUpLoadingData] = useState<boolean>(true);
    const [informError, setInformError] = useState(null);
    const { addCartItem } = useShoppingContext();
   
 
    useEffect(() => {

        takeAllPictureOfOneLaptop(laptopID).then(
            pictureData => {
                setListPictures(pictureData);
            }
        ).catch(
            error => {
                setInformError(error.message);
            }
        );

        takeOneProcessorOfOneLaptop(laptopID).then(
            processorData => {
                setProcessorModels(processorData);
            }
        ).catch(
            error => {
                setInformError(error.message);
            }
        );

        takeAllGraphicsCardOfOneLaptop(laptopID).then(
            graphicsData => {
                setGraphicsCard(graphicsData)
            }
        ).catch(
            error => {
                setInformError(error.message);
            }
        );

        takeAllHardDriverOfOneLaptop(laptopID).then(
            hardDriverData => {
                setHardDriver(hardDriverData);
            }
        ).catch(
            error => {
                setInformError(error.message);
            }
        );

        setUpLoadingData(false)

        takeAllReviewOfOneLaptop(laptopID).then(
            (reviewData) => {
                if (reviewData[0] == null) {
                    setReviewCheck("Chưa có đánh giá.");
                } else {

                    setTotalReviews(reviewData.length);
                    let totalscore: number = 0;
                    for (let i: number = 0; i < reviewData.length; i++) {
                        totalscore = totalscore + reviewData[i].getRating();
                    }
                    const avaragePoint = (totalscore / reviewData.length);
                    setAvaragePointReview(avaragePoint);

                }
                setReview(reviewData);
            }
        ).catch(
            error => {
                setInformError(error.message);
            }
        );

    }, [])


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

        <div >
            <div className="moveY-40px">

                <Link to={`/laptop/${props.laptop.getLaptopID()}`}>
                    {listPictures[0] && listPictures[0].getPictureData() &&
                        <img src={`${listPictures[0].getPictureData()}`}
                            alt={props.laptop.getLaptopName()}
                        />}
                </Link>
            </div>

            <div className="laptop-prop-container-text moveY-95px ">
                <Link to={`/laptop/${props.laptop.getLaptopID()}`} style={{ textDecoration: `none` }}>
                    <p className="handel-text-two-line" > {props.laptop.getLaptopName()}</p>
                </Link>
                <div className="laptop-prop-container-text-sellingPrice row">

                    <div className="col-12">
                        <p>
                            <strong>{formatNumber(props.laptop.getSellingPrice())}  <sup>đ</sup></strong>
                        </p>
                    </div>
                </div>
                <div className="laptop-prop-container-text-listedPrice">
                    <p>
                        <del>{formatNumber(props.laptop.getListedPrice())} <sup>đ</sup></del>
                    </p>
                    <p>
                        -{percentDiscout}%
                    </p>
                </div>
                <div className="laptop-prop-container-text-laptopConfig" >
                    <li><p className="handel-text-one-line">CPU: {processorModels && processorModels.getProcessorName()} , {processorModels && processorModels.getMaxTurboFrequency()}</p></li>
                    <li><p className="handel-text-one-line">RAM: {props.laptop.getRandomMemory()}</p></li>
                    <li><p className="handel-text-one-line"> Màn hình: {props.laptop.getDisplaySize()}</p></li>
                    <li><p className="handel-text-one-line">Ổ cứng SSD: {hardDriver[0] && hardDriver[0].getHardDriverName()}</p></li>
                    <li><p className="handel-text-one-line">Card: {graphicsCard[0] && graphicsCard[0].getGraphicsCardName()}, {graphicsCard[1] && graphicsCard[1].getGraphicsCardName()}</p></li>
                    {/* <li><p className="handel-text-one-line">Pin: {props.laptop.getPin()}</p></li> */}
                    <li><p className="handel-text-one-line">Khối lượng: {props.laptop.getWeigh()}</p></li>
                </div>

                <div className="laptop-prop-container-bottom">
                    <div className="laptop-prop-container-text-product-review">
                        <p>{review[0] == null ? renderRating(0) : renderRating(avaragePointsReview)}   </p>
                
                    </div>
                    <div className="laptop-prop-container-text-addCart">
                        <Link to={`#`} onClick={() =>{addCartItem(props.laptop); handleShowNotification()} }> <i className="fa-solid fa-cart-plus"></i></Link>
                       
                    </div>


                </div>

            </div>

        </div>
    )
}
export default LaptopPropAPI;