import React, { useEffect, useState } from "react";
import LaptopModel from "../../../models/LaptopModel";
import { take8MostExLaptop } from "../../../api/LaptopAPI";
import LaptopPropAPI from "../../product/components/LaptopProp";

export const SliderOutstandingLaptop = () => {

    const [listLaptops1, setlistLaptops1] = useState<LaptopModel[]>([]);
    const [upLoadingData, setUpLoadingData] = useState<boolean>(true);
    const [informError, setInformError] = useState(null);
    const [numberLaptopShow, setNumberLaptopShow] = useState<number>(5);
    const [widthLaptop, setWidthLaptop] = useState<number>(20);
    const [index, setIndex] = useState<number>(0);
    const lefttBtn = document.querySelector('.btn-left');
    const rightBtn = document.querySelector('.btn-right');
    const totalLaptop = document.querySelectorAll('.SliderOutstandingLaptop-container-laptop-item');

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
    );

    useEffect(() => {
        const handelResize = () => {

            if (window.innerWidth >= 1000) {
                setNumberLaptopShow(5);
                setWidthLaptop(20);
            }
            else if (window.innerWidth < 1000 && window.innerWidth >=850) {
                setNumberLaptopShow(4);
                setWidthLaptop(25);
            }
            else if (window.innerWidth < 850 && window.innerWidth >=650 ){
                setNumberLaptopShow(3);
                setWidthLaptop(33);
            } else if (window.innerWidth < 650 ){
                setNumberLaptopShow(2);
                setWidthLaptop(50);
            }
        };
        window.addEventListener('resize', handelResize);

        handelResize();

        return () => {
            window.removeEventListener('resize', handelResize);
        }
    }, []);

    useEffect(() => {
        // Quan trọng: Hàm sẽ chạy lại khi index và widthLaptop cập nhật
        // Cách này tiện dùng hơn javascript.
        // Các function liên quan chỉ cần cập nhật index và widthLaptop
        const temp = document.querySelector('.SliderOutstandingLaptop-container-laptop-items') as HTMLElement;
        const handelMoveBanner = () => {
            if (temp) {
                temp.style.right = index * widthLaptop + "%";
            }
        };
        handelMoveBanner();
    }, [index, widthLaptop])

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex(prevIndex => (prevIndex + 1) % (listLaptops1.length - numberLaptopShow +1));
        }, 3000);
        // Hàm này chỉ thực hiện khi interval không được gọi nữa, chứ không phải chạy mỗi lần gọi
        // Ví dụ: khi chuyển trang khác, khi handelNextButton được dùng.
        return () => clearInterval(interval);
    }, []);

    const handelNextButton = () => {
        setIndex(prevIndex => (prevIndex + 1) % (listLaptops1.length - numberLaptopShow + 1));
    };

    const handelPrevButton = () => {
        setIndex(prevIndex => (prevIndex - 1 + (listLaptops1.length - numberLaptopShow + 1)) % (listLaptops1.length - numberLaptopShow + 1));
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
                            <i className="fa-solid fa-angle-left btn-left" onClick={handelPrevButton}></i>
                            <i className="fa-solid fa-angle-right btn-right" onClick={handelNextButton}></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}