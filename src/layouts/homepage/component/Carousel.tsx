import React, { useEffect, useState } from "react";
import LaptopModel from "../../../models/LaptopModel";
import { take3NewestLaptops } from "../../../api/LaptopAPI";
import { CarouselItem } from "./CarouselItem";

export const Carousel: React.FC = () => {

    // handel button left right
    const [listLaptops, setListLaptop] = useState<LaptopModel[]>([]);
    const [upLoadingData, setUpLoadingData] = useState<boolean>(true);
    const [informError, setInformError] = useState(null);
    const [index01, setIndex] = useState<number>(0);
    const [imgNumber, setImgNumber] = useState<number>(0);
    const totalDot = document.querySelectorAll('.dot');

    const handleUpdateNumberImg = (event: React.SyntheticEvent<HTMLDivElement>) => {
        const totalImg = document.querySelectorAll('.carousel-img');
        setImgNumber(totalImg.length);
    }

    useEffect(() => {
        // Quan trọng: Hàm sẽ chạy lại khi index và widthLaptop cập nhật
        // Cách này tiện dùng hơn javascript.
        // Các function liên quan chỉ cần cập nhật index và widthLaptop
        const handelMoveBanner = () => {
            const temp = document.querySelector('.slider01-top-container') as HTMLElement;
            if (temp) {
                temp.style.right = index01 * 100 + "%";
                totalDot.forEach(function (dot, indexDot) {
                    if (indexDot === index01) {
                        removeDotActive();
                        dot.classList.add("dot-active");
                    }
                });
            }
        }
        handelMoveBanner();
    }, [index01]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (index01 < imgNumber - 1) {
                setIndex(pre => pre + 1);
                
            } else {
                setIndex(0);
            }
        }, 3000);
        // Hàm này chỉ thực hiện khi interval không được gọi nữa, chứ không phải chạy mỗi lần gọi
        // Ví dụ: khi chuyển trang khác, khi handelNextButton được dùng.
        return () => clearInterval(interval);
    }, [imgNumber, index01]);

    const handelNextButton = () => {
        setIndex(prevIndex => (prevIndex + 1) % (imgNumber));
    };
    const handelPrevButton = () => {
        setIndex(prevIndex => (prevIndex - 1 + imgNumber) % (imgNumber));
    };

    //Handel button dot
    if (totalDot.length > 0) {
        totalDot.forEach(function (dot, indexDot) {
            dot.addEventListener("click", function () {
                removeDotActive();
                dot.classList.add("dot-active");
                setIndex(indexDot);
            });
        });
    }
    function removeDotActive() {
        let dotActive = document.querySelector('.dot-active');
        dotActive?.classList.remove("dot-active");
    }
    useEffect(() => {
        take3NewestLaptops().then(
            laptopData => {
                setListLaptop(laptopData.result);
                setUpLoadingData(false)
            }
        ).catch(
            error => {
                setInformError(error.message);
            }
        )
    }, [])

    if (upLoadingData) {
        return (
            <div>
                <h1>Uploading data!</h1>
            </div>
        );
    }
    if (informError) {
        return (
            <div>
                <h1>Error: {informError}</h1>
            </div>
        );
    }
    return (

        <div className="slider01">
            <div className="slider01-top">
                <div className="slider01-top-container">
                    <a href="#" className="carousel-img"><img src={require('./../../../images/slider/slider3.jpg')} alt="" onLoad={handleUpdateNumberImg} /></a>
                    <a href="#" className="carousel-img"><img src={require('./../../../images/slider/slider1.png')} alt="" /></a>
                    <a href="#" className="carousel-img"><img src={require('./../../../images/slider/slider3.jpg')} alt="" /></a>
                    <a href="#" className="carousel-img"><img src={require('./../../../images/slider/slider4.jpg')} alt="" /></a>
                    <a href="#" className="carousel-img"><img src={require('./../../../images/slider/slider5.jpg')} alt="" /></a>
                    <a href="#" className="carousel-img"><img src={require('./../../../images/slider/slider6.jpg')} alt="" /></a>
                </div>
                <div className="slider01-top-btn">
                    <i className="fa-solid fa-angle-left" onClick={handelPrevButton}></i>
                    <i className="fa-solid fa-angle-right" onClick={handelNextButton}></i>
                </div>
                <div className="slider01-top-button" >
                    <div className="dot dot-active"></div>
                    <div className="dot "></div>
                    <div className="dot "></div>
                    <div className="dot "></div>
                    <div className="dot "></div>
                    <div className="dot "></div>
                </div>
            </div>
            <div ></ div>
        </div>
    );
}
