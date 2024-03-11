import React, { useEffect, useState } from "react";
import LaptopModel from "../../models/LaptopModel";
import { findBooks, takeAllLaptops } from "../../api/LaptopAPI";
import LaptopPropAPI from "./components/LaptopProp";
import { Pagination } from "../utils/Pagination";

interface listLaptopProps {
    keyWordFindBooks: string;
    brandIDNumber: number;
}

function ListLaptopAPI({ keyWordFindBooks, brandIDNumber }: listLaptopProps) {

    const [listLaptops, setListLaptops] = useState<LaptopModel[]>([]);
    const [upLoadingData, setUpLoadingData] = useState<boolean>(true);
    const [informError, setInformError] = useState(null);

    const [presentPage, setPresentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalLaptops, setTotalLaptops] = useState(0);

    useEffect(() => {
        if (keyWordFindBooks === '' && brandIDNumber == 0) {
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
            findBooks(keyWordFindBooks, brandIDNumber).then(
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
    }, [presentPage, keyWordFindBooks, brandIDNumber]
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
                    <div className="AllLaptops-container-title">
                        <h4>TOÀN BỘ LAPTOP</h4>
                    </div>

                    <div className="AllLaptops-container-laptop">
                        <div className="AllLaptops-container-laptop-items d-flex  flex-wrap">
                            {
                                listLaptops.map((laptop) => (
                                    <div className="AllLaptops-container-laptop-item col-md-2dot4" key={laptop.getLaptopID()}>
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