import React, { useEffect, useState } from "react";
import LaptopModel from "../../models/LaptopModel";
import { findBooks, takeAllLaptops } from "../../api/LaptopAPI";
import LaptopPropAPI from "./components/LaptopProp";
import { Pagination } from "../utils/Pagination";

interface listLaptopProps {
    keyWordFindLaptops: string;
}

export function FindLaptop({ keyWordFindLaptops }: listLaptopProps) {

    const [listLaptops, setListLaptops] = useState<LaptopModel[]>([]);
    const [upLoadingData, setUpLoadingData] = useState<boolean>(true);
    const [informError, setInformError] = useState(null);

    const [presentPage, setPresentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalLaptops, setTotalLaptops] = useState(0);

    useEffect(() => {
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
    }, [presentPage, keyWordFindLaptops]
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
                    <h1> Không tìm thấy laptop quý khách tìm kiếm!</h1>
                </div>
            </div>
        )
    }
    return (
        <div className="FindLaptop background-color-main">
            <div className="container">

                <div className="FindLaptop_top">
                    <div className="FindLaptop_top_border">
                        <div className="FindLaptop_top_border_content">
                            <h4>Kết quả tìm kiếm cho: <span>"{keyWordFindLaptops}"</span></h4>
                            <h5>Tìm thấy <span>{listLaptops.length}</span> sản phẩm</h5>
                        </div>
                    </div>
                </div>
                <div className="FindLaptop-bottom">
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