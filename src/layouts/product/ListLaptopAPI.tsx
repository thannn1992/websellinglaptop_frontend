import React, { useEffect, useState } from "react";
import LaptopModel from "../../models/LaptopModel";
import { findBooks, takeAllLaptops } from "../../api/LaptopAPI";
import LaptopPropAPI from "./components/LaptopProp";
import { Pagination } from "../utils/Pagination";

interface listLaptopProps {
    keyWordFindLaptops: string;
    brandIDNumber: number;
}

function ListLaptopAPI({ keyWordFindLaptops, brandIDNumber }: listLaptopProps) {

    const [listLaptops, setListLaptops] = useState<LaptopModel[]>([]);
    const [upLoadingData, setUpLoadingData] = useState<boolean>(true);
    const [informError, setInformError] = useState(null);

    const [presentPage, setPresentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalLaptops, setTotalLaptops] = useState(0);

    useEffect(() => {
        if (keyWordFindLaptops === '' && brandIDNumber == 0) {
            takeAllLaptops(presentPage - 1).then(
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
        } else {
            findBooks(keyWordFindLaptops).then(
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
        }
    }, [presentPage, keyWordFindLaptops, brandIDNumber]
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

        <div className="AllLaptops">
            <div className="container">

                <div className="AllLaptops-container">
                    <div className="SliderOutstandingLaptop-container-title">
                        <h4>TOÀN BỘ LAPTOP</h4>
                    </div>

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
export default ListLaptopAPI;