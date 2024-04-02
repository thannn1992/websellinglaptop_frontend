import React, { useEffect, useState } from "react";
import LaptopModel from "../../../models/LaptopModel";
import { take10CheapExLaptop, take8MostExLaptop } from "../../../api/LaptopAPI";
import LaptopPropAPI from "../../product/components/LaptopProp";

export const LaptopBestSelling = () => {

    const [listLaptops2, setlistLaptops2] = useState<LaptopModel[]>([]);
    const [upLoadingData, setUpLoadingData] = useState<boolean>(true);
    const [informError, setInformError] = useState(null);

    useEffect(() => {
        take10CheapExLaptop().then(
            laptopData => {
                setlistLaptops2(laptopData.result);
                setUpLoadingData(false);
            }
        ).catch(
            error => {
                setInformError(error.message);
            }
        );
    }, []
    )

   

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

    return (
        // class này margin object
        <div className="LaptopBestSelling">
            {/* Lớp này fit 2 bên ojbect 1200px */}
            <div className="container">
                {/* Lớp này đặt vị trí relative và overflor: hidden */}
                <div className="SliderOutstandingLaptop-container">
                    <div className="SliderOutstandingLaptop-container-title">
                        <h4>LAPTOP BÁN CHẠY</h4>
                    </div>

                    {/* Lớp này định vị trí cho toàn bộ laptop position: relative, height, transition */}
                    <div className="LaptopBestSelling-container-laptop">
                        <div className="LaptopBestSelling-container-laptop-items">
                            {
                                listLaptops2.map((laptop) => (
                                    <div className="LaptopBestSelling-container-laptop-item" key={laptop.getLaptopID()}>
                                        <div className="laptop-prop-container">
                                            <LaptopPropAPI key={laptop.getLaptopID()} laptop={laptop} />
                                        </div>
                                    </div>
                                )
                                )
                            }
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}