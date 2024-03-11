import React, { useEffect, useState } from "react";
import LaptopModel from "../../../models/LaptopModel";
import { take3NewestLaptops } from "../../../api/LaptopAPI";
import { CarouselItem } from "./CarouselItem";


export const Carousel: React.FC = () => {

    // handel button left right
    const lefttBtn = document.querySelector('.fa-angle-left');
    const rightBtn = document.querySelector('.fa-angle-right');
    const totalImg = document.querySelectorAll('.slider01-top-container img')
    const temp = document.querySelector('.slider01-top-container') as HTMLElement

    let index: number = 0;
    rightBtn?.addEventListener("click", function () {
        index = index + 1;
        if (index > totalImg.length - 1) {
            index = 0;
        }
        if (temp) {
            temp.style.right = index * 100 + "%";
        }
    })

    lefttBtn?.addEventListener("click", function () {
        index = index - 1;
        if (index <= 0) {
            index = totalImg.length - 1;
        }
        if (temp) {
            temp.style.right = index * 100 + "%";
        }
    })

    // handel button dot
    const findImg = document.querySelectorAll('.slider01-top-button img') as NodeListOf<HTMLImageElement>;
    const totalDot = document.querySelectorAll('.dot')
    const totalImgDot = findImg.length;
    totalDot.forEach(function (dot, indexDot) {
        dot.addEventListener("click", function () {
            removeDotActive();
            if (temp) {
                temp.style.right = indexDot * 100 + "%";
                dot.classList.add("dot-active");
                index = indexDot;
            }
        })
    })

    function removeDotActive(){
        let dotActive = document.querySelector('.dot-active');
        dotActive?.classList.remove("dot-active");
    }

    //Handel auto change img
    function slideAutoRun() {
        index++;
        if (index > totalImg.length - 1) {
            index = 0;
        }
        if (temp) {
            removeDotActive();
            temp.style.right = index * 100 + "%";
            totalDot[index].classList.add("dot-active");
        }
    }
    setInterval(slideAutoRun, 4000);
    // create useState
    const [listLaptops, setListLaptop] = useState<LaptopModel[]>([])
    const [upLoadingData, setUpLoadingData] = useState<boolean>(true);
    const [informError, setInformError] = useState(null);

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
    }, []
    )

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
                    <a href="#"><img src={require('./../../../images/slider/slider3.jpg')} alt="" /></a>
                    <a href="#"><img src={require('./../../../images/slider/slider1.png')} alt="" /></a>
                    <a href="#"><img src={require('./../../../images/slider/slider3.jpg')} alt="" /></a>
                    <a href="#"><img src={require('./../../../images/slider/slider4.jpg')} alt="" /></a>
                    <a href="#"><img src={require('./../../../images/slider/slider5.jpg')} alt="" /></a>
                    <a href="#"><img src={require('./../../../images/slider/slider6.jpg')} alt="" /></a>
                </div>
                <div className="slider01-top-btn">
                    <i className="fa-solid fa-angle-left"></i>
                    <i className="fa-solid fa-angle-right"></i>
                </div>
                <div className="slider01-top-button">
                    <div className="dot dot-active"></div>
                    <div className="dot "></div>
                    <div className="dot "></div>
                    <div className="dot "></div>
                    <div className="dot "></div>
                    <div className="dot "></div>
                </div>
            </div>

        </div>
    );
}
