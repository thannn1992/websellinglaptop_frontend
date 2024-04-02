import React, { useEffect, useState } from "react";
import LaptopModel from "../../models/LaptopModel";
import { findBooks, findLaptopBrand, takeAllLaptops } from "../../api/LaptopAPI";
import LaptopPropAPI from "./components/LaptopProp";
import { Pagination } from "../utils/Pagination";
import { useParams } from "react-router-dom";
import BrandModel from "../../models/BrandModel";
import { takeBrandFromID } from "../../api/BrandAPI";

interface laptopBrandInterface {
    keyWordFindBrands: number;
}

function LaptopBrand() {
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

    const [listLaptops, setListLaptops] = useState<LaptopModel[]>([]);
    const [upLoadingData, setUpLoadingData] = useState<boolean>(true);
    const [informError, setInformError] = useState(null);

    const[brandLaptop, setBrandLaptop] = useState<BrandModel| null>(null);

    const [presentPage, setPresentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalLaptops, setTotalLaptops] = useState(0);

    useEffect(() => {
       
            findLaptopBrand(brandIDNumber).then(
                laptopData => {
                    setListLaptops(laptopData.result);
                    setTotalPages(laptopData.totalPages);
                    setTotalLaptops(laptopData.totalLaptops);

                    setUpLoadingData(false);
                }
            ).catch(
                error => {
                    setInformError(error.message);
                }
            );
            takeBrandFromID(brandIDNumber).then(
                brandData => {
                    setBrandLaptop(brandData)
                }
            )
    }, [presentPage, brandIDNumber]
    )

    const pagination = (page: number) => {
        setPresentPage(page);
    };

    if (upLoadingData) {
        return (
            <div>
                <h1>Đang tải dữ liệu</h1>
            </div>
        )
    }

    if (informError) {
        return (
            <div>
                <h1>Gặp lỗi: {informError}</h1>
            </div>
        )
    }

    if (listLaptops.length == 0) {
        return (
            <div className="container">
                <div className="d-flex align-items-center justify-content-center mt-4">
                    <h1> Không tìm thấy sách quý khách tìm kiếm!</h1>
                </div>
            </div>
        )
    }

    return (

        <div className="Laptops_Brand">
            <div className="container">
                <div className="Laptops_Brand_Border">
                <div className="Laptops_Brand_Infor">
                    <h4>Laptop {brandLaptop?.getbrandName()}</h4>
                    <h5>{brandLaptop?.getbrandDescription()}</h5>
                </div>
                </div>
                
                <div className="AllLaptops-container">


                    <div className="LaptopBestSelling-container-laptop">
                        <div className="LaptopBestSelling-container-laptop-items">
                            {
                                listLaptops.map((laptop) => (
                                    <div className="LaptopBestSelling-container-laptop-item" key={laptop.getLaptopID()}>
                                        <div className="laptop-prop-container" key={laptop.getLaptopID()}>
                                            <LaptopPropAPI laptop={laptop} />
                                        </div>
                                    </div>
                                )
                                )
                            }
                        </div>
                    </div>
                    <div className="Pagination ">
                        <Pagination presentPage={presentPage} totalPage={totalPages} pagination={pagination} />
                    </div>
                </div>

            </div>

        </div>



    )
}
export default LaptopBrand;