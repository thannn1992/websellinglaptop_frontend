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

interface LaptopPropAPIInterface {
    laptop: LaptopModel;
}

const LaptopPropAPI: React.FC<LaptopPropAPIInterface> = (props) => {

    const laptopID = props.laptop.getLaptopID();
    const listedPrice: number = props.laptop.getListedPrice();
    const sellingPrice: number = props.laptop.getSellingPrice();
    const percentDiscout = Math.round((1 - sellingPrice / listedPrice) * 100);

    const [listPictures, setListPictures] = useState<PictureModel[]>([]);
    const [processorModels, setProcessorModels] = useState<ProcessorModel>();
    const [graphicsCard, setGraphicsCard] = useState<GraphicsCardModel[]>([]);
    const [hardDriver, setHardDriver] = useState<HardDriverModel[]>([]);
    const [upLoadingData, setUpLoadingData] = useState<boolean>(true);
    const [informError, setInformError] = useState(null);

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

                </div>

            </div>
    )
}
export default LaptopPropAPI;