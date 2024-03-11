import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LaptopModel from "../../models/LaptopModel";
import { takeALaptopFromID } from "../../api/LaptopAPI";
import { LaptopPictures } from "./components/LaptopPicture";
import { ReviewLaptop } from "./components/ReviewLaptop";


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

    const increaseQuantities = () => {
            const presentQuantites = (laptop?.getLaptopQuantities() ? laptop.getLaptopQuantities() : 0);
        if(quantities <presentQuantites){
            setQuantities(quantities + 1);
        }
        }

    const decreaseQuantities = () => {
        if(quantities >= 2) {
            setQuantities(quantities -1);
        }
    }

    const handleQtyChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        const qtyNew = parseInt(event.target.value);
        const presentQuantites = (laptop?.getLaptopQuantities() ? laptop.getLaptopQuantities() : 0);
        if(!isNaN(qtyNew) && qtyNew >= 1 && qtyNew <= presentQuantites){
            setQuantities(qtyNew);
        }
    }

    const handleBuyLaptopNow = () => {

    }

    const handleAddLaptopCart = () => {

    }

    useEffect(() => {
        takeALaptopFromID(laptopIDNumber).then(
            (laptop) => {
                setLaptop(laptop);
                setIsLoading(false);
            }
        ).catch(
            (error) => {
                setIsLoading(false);
                setError(error.message);
            }
        )
    }, [laptopID]
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
        <div className="container">
            <div className="row mt-4 mb-4">
                <div className="col-4">
                    <LaptopPictures laptopID={laptopIDNumber} />
                </div>

                <div className="col-8">
                    <div className="row">
                        <div className="col-8">
                            <h1>
                            {}
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

                </div>
            </div>

            <div className="row mt-4 mb-4">
                <ReviewLaptop laptopID={laptopIDNumber} />
            </div>

        </div>
    )

}