import React, { useEffect, useState } from "react";
import LaptopModel from "../../../models/LaptopModel";
import { take8MostExLaptop } from "../../../api/LaptopAPI";
import LaptopPropAPI from "../../product/components/LaptopProp";

export const SliderOutstandingLaptop = () => {

    const [listLaptops1, setlistLaptops1] = useState<LaptopModel[]>([]);
    const [upLoadingData, setUpLoadingData] = useState<boolean>(true);
    const [informError, setInformError] = useState(null);

    useEffect(() => {
        take8MostExLaptop().then(
            laptopData => {
                setlistLaptops1(laptopData.result);
                setUpLoadingData(false);
            }
        ).catch(
            error => {
                setInformError(error.message);
            }
        );
    }, []
    )

    // handel button left right
    const lefttBtn = document.querySelector('.btn-left');
    const rightBtn = document.querySelector('.btn-right');
    const totalLaptop = document.querySelectorAll('.SliderOutstandingLaptop-container-laptop-item');
    const temp = document.querySelector('.SliderOutstandingLaptop-container-laptop-items') as HTMLElement;
   
    let index: number = 0;
    rightBtn?.addEventListener("click", function () {
       
        index = index + 1;
        if (index > totalLaptop.length - 5) {
            index = 0;
        }
        if (temp) {
            temp.style.right = index *20 + "%";
        }
    })

    lefttBtn?.addEventListener("click", function () {
        index = index-1;
        if (index < 0) {
            index = totalLaptop.length - 5;
        }
        if (temp) {
            temp.style.right = index * 20 + "%";
        }
    })

    //Handel auto change img

    function slideAutoRun() {
        index = index + 1;
        if (index > totalLaptop.length - 5) {
            index = 0;
        }   
        if(temp){
            temp.style.right = index * 20 + "%";
        } 
    }
    setInterval(slideAutoRun, 3000);

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
        <div className="SliderOutstandingLaptop">
            {/* Lớp này fit 2 bên ojbect 1200px */}
            <div className="container">
                {/* Lớp này đặt vị trí relative và overflor: hidden */}
                <div className="SliderOutstandingLaptop-container">
                    <div className="SliderOutstandingLaptop-container-title">
                        <h4>LAPTOP NỔI BẬT</h4>
                    </div>

                    {/* Lớp này định vị trí cho toàn bộ laptop position: relative, height, transition */}
                    <div className="SliderOutstandingLaptop-container-laptop">
                        <div className="SliderOutstandingLaptop-container-laptop-items">
                            {
                                listLaptops1.map((laptop) => (
                                    <div className="SliderOutstandingLaptop-container-laptop-item" key={laptop.getLaptopID()}>
                                        <div className="laptop-prop-container">
                                            <LaptopPropAPI key={laptop.getLaptopID()} laptop={laptop} />
                                        </div>
                                    </div>
                                )
                                )
                            }
                        </div>
                        <div className="slider02-top-btn">
                            <i className="fa-solid fa-angle-left btn-left"></i>
                            <i className="fa-solid fa-angle-right btn-right"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}