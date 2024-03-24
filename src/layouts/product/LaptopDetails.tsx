import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LaptopModel from "../../models/LaptopModel";
import { takeALaptopFromID } from "../../api/LaptopAPI";
import { LaptopPictures } from "./components/LaptopPicture";
import { ReviewLaptop } from "./components/ReviewLaptop";
import ReviewModel from "../../models/ReviewModel";
import { takeAllReviewOfOneLaptop } from "../../api/ReviewAPI";
import { renderRating } from "../utils/StarRating";
import { formatNumber } from "../utils/FormatNumber";
import PictureModel from "../../models/PictureModel";
import ProcessorModel from "../../models/ProcessorModel";
import GraphicsCardModel from "../../models/GraphicsCardModel";
import HardDriverModel from "../../models/HardDriverModel";
import { takeAllPictureOfOneLaptop } from "../../api/PictureAPI";
import { takeOneProcessorOfOneLaptop } from "../../api/ProcessorAPI";
import { takeAllGraphicsCardOfOneLaptop } from "../../api/GraphicsCardAPI";
import { takeAllHardDriverOfOneLaptop } from "../../api/HardDriversAPI";
import ScreenResolutionModel from "../../models/ScreenResolutionModel";
import { takeOneScreenOfOneLaptop } from "../../api/ScreenResolutionAPI";
import { takeBrandofALaptop } from "../../api/BrandAPI";
import BrandModel from "../../models/BrandModel";
import { takeModelofALaptop } from "../../api/ModelAPI";
import ModelModel from "../../models/ModelModel";


export function LaptopDetails() {

    //take idLaptop form URL
    const { laptopID } = useParams();

    let laptopIDNumber = 0;

    try {
        laptopIDNumber = parseInt(laptopID + '');
        if (Number.isNaN(laptopIDNumber)) {
            laptopIDNumber = 0;
        }
    } catch (error) {
        laptopIDNumber = 0;
        console.error("Error: ", error);
    }

    // Declare 
    const [laptop, setLaptop] = useState<LaptopModel | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantities, setQuantities] = useState(1);
    const [review, setReview] = useState<ReviewModel[]>([]);
    const [totalReviews, setTotalReviews] = useState<number>(0);
    const [avaragePointsReview, setAvaragePointReview] = useState<number>(0);

    const [reviewCheck, setReviewCheck] = useState<string>();
    const listedPrice: number = laptop == null ? 0 : laptop.getListedPrice();
    const sellingPrice: number = laptop == null ? 0 : laptop.getSellingPrice();
    const percentDiscout = Math.round((1 - sellingPrice / listedPrice) * 100);


    const [listPictures, setListPictures] = useState<PictureModel[]>([]);
    const [processorModels, setProcessorModels] = useState<ProcessorModel>();
    const [graphicsCard, setGraphicsCard] = useState<GraphicsCardModel[]>([]);
    const [hardDriver, setHardDriver] = useState<HardDriverModel[]>([]);
    const [screenResolution, setScreenResolution] = useState<ScreenResolutionModel>();
    const [brand, setBrand] = useState<BrandModel>();
    const [model, setModel] = useState<ModelModel>();
    const [upLoadingData, setUpLoadingData] = useState<boolean>(true);

    const [informError, setInformError] = useState(null);

    // const increaseQuantities = () => {
    //     const presentQuantites = (laptop?.getLaptopQuantities() ? laptop.getLaptopQuantities() : 0);
    //     if (quantities < presentQuantites) {
    //         setQuantities(quantities + 1);
    //     }
    // }

    // const decreaseQuantities = () => {
    //     if (quantities >= 2) {
    //         setQuantities(quantities - 1);
    //     }
    // }

    // const handleQtyChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const qtyNew = parseInt(event.target.value);
    //     const presentQuantites = (laptop?.getLaptopQuantities() ? laptop.getLaptopQuantities() : 0);
    //     if (!isNaN(qtyNew) && qtyNew >= 1 && qtyNew <= presentQuantites) {
    //         setQuantities(qtyNew);
    //     }
    // }

    // const handleBuyLaptopNow = () => {

    // }

    // const handleAddLaptopCart = () => {

    // }

    useEffect(() => {

        takeALaptopFromID(laptopIDNumber).then(
            (laptop) => {
                setLaptop(laptop);

            }
        ).catch(
            (error) => {
                setError(error.message);
            }
        );

        takeModelofALaptop(laptopIDNumber).then(
            modelData => {
                setModel(modelData);
            }
        )

        takeBrandofALaptop(laptopIDNumber).then(
            (brandData) => {
                setBrand(brandData);
            }
        ).catch(
            (error) => {
                setError(error.message);
            }
        );

        takeAllReviewOfOneLaptop(laptopIDNumber).then(
            (reviewData) => {
                if (reviewData[0] == null) {
                    setReviewCheck("Chưa có đánh giá.");
                } else {
                    console.log("vo toi")
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
                setError(error.message);
            }
        );

        takeAllPictureOfOneLaptop(laptopIDNumber).then(
            pictureData => {
                setListPictures(pictureData);
            }
        ).catch(
            error => {
                setInformError(error.message);
            }
        );

        takeOneProcessorOfOneLaptop(laptopIDNumber).then(
            processorData => {
                setProcessorModels(processorData);
            }
        ).catch(
            error => {
                setInformError(error.message);
            }
        );

        takeAllGraphicsCardOfOneLaptop(laptopIDNumber).then(
            graphicsData => {
                setGraphicsCard(graphicsData)
            }
        ).catch(
            error => {
                setInformError(error.message);
            }
        );

        takeAllHardDriverOfOneLaptop(laptopIDNumber).then(
            hardDriverData => {
                setHardDriver(hardDriverData);
            }
        ).catch(
            error => {
                setInformError(error.message);
            }
        );

        takeOneScreenOfOneLaptop(laptopIDNumber).then(
            screenData => {
                setScreenResolution(screenData);
            }
        ).catch(
            error => {
                setInformError(error.message);
            }
        );

        setUpLoadingData(false)

        setIsLoading(false);
    }, []
    )

    if (isLoading) {
        return (
            <div>
                <h1>
                    Loading data!
                </h1>
            </div>
        )
    }

    if (error) {
        return (
            <div>
                <h1>
                    This laptop don't exist: {error}
                </h1>
            </div>
        )
    }

    return (
        <div className="LaptopDetails marginTop80px ">
            <div className="container">
                <div className="LaptopDetails-content">
                    <div className="LaptopDetails-content-directory-tree">
                        <p><Link to="/"> <i className="fa-solid fa-house"></i>   </Link>   </p>
                        <p> <i className="fa-solid fa-angle-right">   </i>   </p>
                        <p><Link to={`/${brand?.getbrandID()}`}>{brand?.getbrandName()}</Link> </p>
                        <p> <i className="fa-solid fa-angle-right"></i></p>
                        <p><a href="#">{model?.getModelName()}</a> </p>

                    </div>
                    <div className="LaptopDetails-content-top ">
                        <div className="LaptopDetails-content-left">
                            <LaptopPictures laptopID={laptopIDNumber} />
                        </div>
                        <div className="LaptopDetails-content-right">
                            <div className="LaptopDetails-content-right-border">
                                <div className="LaptopDetails-content-right-product-name">
                                    <p>{laptop?.getLaptopName()}</p>
                                    <p>Thương hiệu: <span>{brand?.getbrandName()} </span> </p>
                                    <p>Dòng máy: <span>{model?.getModelName()}</span> </p>
                                </div>

                                <div className="LaptopDetails-content-right-product-review">
                                    <p>{review[0] == null ? renderRating(0) : renderRating(avaragePointsReview)}   </p>
                                    {review[0] == null ? <p> {reviewCheck}</p> : <p> {totalReviews} đánh giá</p>}
                                </div>
                                <div className="LaptopDetails-content-right-product-priceAndAdd">
                                    <div className="LaptopDetails-content-right-product-price">
                                        <div className="LaptopDetails-content-right-product-price">
                                            <div>
                                                <strong>{formatNumber(laptop == null ? 0 : laptop.getSellingPrice())} <sup>đ</sup></strong>
                                            </div>
                                            <div className="d-flex">
                                                <p>
                                                    <del>{formatNumber(laptop == null ? 0 : laptop.getListedPrice())} <sup>đ</sup></del>
                                                </p>
                                                <p>
                                                    -{percentDiscout}%
                                                </p>
                                            </div>

                                            <div className="LaptopDetails-content-right-product-add">
                                                <p ><button>Mua ngay <br/><span>(Giao nhanh từ 2 giờ hoặc nhận tại cửa hàng)</span></button> </p>
                                                <p><button><i className="fa-solid fa-cart-plus"><br/><span>Thêm vào giỏ</span></i></button></p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* <div className="col-5">
                            <div className="row">
                                <div className="col-8">
                                    <h1>
                                        { }
                                    </h1>

                                </div>

                                <div className="col-4">
                                    PHẦN ĐẶT HÀNG

                                    <div className="mb-2">
                                        Số lượng
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <button className="btn btn-outline-secondary me-2" onClick={decreaseQuantities}>-</button>
                                        <input className="form-control text-center" value={quantities} min={1} onChange={handleQtyChanged}></input>
                                        <button className="btn btn-outline-secondary ms-2" onClick={increaseQuantities}>-</button>
                                    </div>
                                    <div>
                                        Số tiến tạm tính
                                    </div>

                                    <div className="d-grid gap-2">
                                        <button type="button" className="btn btn-danger mt-3" onClick={handleBuyLaptopNow}> Mua sách ngay</button>
                                        <button type="button" className="btn btn-outline-secondary mt-2" onClick={handleAddLaptopCart}> Thêm sách vào giỏ hàng</button>
                                    </div>
                                </div>
                            </div>

                        </div> */}
                                </div>

                                <div className="row mt-4 mb-4">
                                    <ReviewLaptop laptopID={laptopIDNumber} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="LaptopDetails-content-bottom">
                        <div className="LaptopDetails-content-bottom-config">
                            <div className="LaptopDetails-content-bottom-config-top">
                                <h5>
                                    Cấu hình laptop
                                </h5>
                                {/* <a href="#">Xem cấu hình chi tiết</a> */}
                            </div>
                            <div className="LaptopDetails-content-bottom-config-bottom">
                                <table className="LaptopDetails-content-bottom-config-bottom-table">
                                    <tbody>
                                        <tr>
                                            <td colSpan={2} className="LaptopDetails-content-bottom-config-bottom-item">
                                                Bộ xử lý
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Loại CPU: </td>
                                            <td> {processorModels && processorModels.getProcessorName()}</td>
                                        </tr>
                                        <tr>
                                            <td>Tốc độ: </td>
                                            <td>{processorModels && processorModels.getMaxTurboFrequency()}</td>
                                        </tr>
                                        <tr>
                                            <td>Bộ nhớ đệm: </td>
                                            <td>{processorModels && processorModels.getCache()}</td>
                                        </tr>
                                        <tr>
                                            <td colSpan={2} className="LaptopDetails-content-bottom-config-bottom-item">
                                                Card đồ họa
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Card onboard: </td>
                                            <td>{graphicsCard[0] && graphicsCard[0].getGraphicsCardName()}</td>
                                        </tr>
                                        <tr>
                                            <td>Card rời: </td>
                                            <td>{graphicsCard[1] == null ? "Không có" : graphicsCard[1].getGraphicsCardName()}</td>
                                        </tr>
                                        <tr>
                                            <td colSpan={2} className="LaptopDetails-content-bottom-config-bottom-item">
                                                RAM
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Dung lượng RAM: </td>
                                            <td>{laptop?.getRandomMemory()}</td>
                                        </tr>
                                        <tr>
                                            <td>RAM hỗ trợ tối đa: </td>
                                            <td>{laptop?.getUpgradeAbilityRAM()}</td>
                                        </tr>

                                        <tr>
                                            <td colSpan={2} className="LaptopDetails-content-bottom-config-bottom-item">
                                                Ổ cứng
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Dung lượng SSD: </td>
                                            <td>{hardDriver[0] && hardDriver[0].getHardDriverName()}</td>
                                        </tr>
                                        <tr>
                                            <td>Khả năng nâng cấp: </td>
                                            <td>{laptop?.getUpgradeAbilityDiskDrive()}</td>
                                        </tr>

                                        <tr>
                                            <td colSpan={2} className="LaptopDetails-content-bottom-config-bottom-item">
                                                Màn hình
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Màn hình: </td>
                                            <td>{laptop?.getDisplaySize()}</td>
                                        </tr>
                                        <tr>
                                            <td>Tấm phủ màn hình: </td>
                                            <td>{laptop?.getCoating()}</td>
                                        </tr>
                                        <tr>
                                            <td>Thông số khác: </td>
                                            <td>{screenResolution?.getScreenResolutionName()}</td>
                                        </tr>

                                        <tr>
                                            <td colSpan={2} className="LaptopDetails-content-bottom-config-bottom-item">
                                                Khối lượng, kích thước và màu sắc
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>Khối lượng: </td>
                                            <td>{laptop?.getWeigh()}</td>
                                        </tr>
                                        <tr>
                                            <td>Kích thước: </td>
                                            <td>{laptop?.getDimension()}</td>
                                        </tr>
                                        <tr>
                                            <td>Màu sắc: </td>
                                            <td>{laptop?.getColour()}</td>
                                        </tr>

                                        <tr>
                                            <td colSpan={2} className="LaptopDetails-content-bottom-config-bottom-item">
                                                Pin
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>Dung lượng pin: </td>
                                            <td>{laptop?.getPin()}</td>
                                        </tr>

                                        <tr>
                                            <td colSpan={2} className="LaptopDetails-content-bottom-config-bottom-item">
                                                Webcam và âm thanh
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>Webcam và âm thanh: </td>
                                            <td>{laptop?.getWebcam()}</td>
                                        </tr>

                                        <tr>
                                            <td colSpan={2} className="LaptopDetails-content-bottom-config-bottom-item">
                                                Cổng kết nối
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>Cổng kết nối: </td>
                                            <td>{laptop?.getPort()}</td>
                                        </tr>

                                        <tr>
                                            <td colSpan={2} className="LaptopDetails-content-bottom-config-bottom-item">
                                                Kết nối
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>Bluetooth: </td>
                                            <td>{laptop?.getBluetooth()}</td>
                                        </tr>

                                        <tr>
                                            <td colSpan={2} className="LaptopDetails-content-bottom-config-bottom-item">
                                                Hệ điều hành
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>OS </td>
                                            <td>{laptop?.getOperatingSystem()}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

