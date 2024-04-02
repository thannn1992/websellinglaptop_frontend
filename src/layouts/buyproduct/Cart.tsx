import React, { useState } from "react";
import { useShoppingContext } from "../../contexts/ShoppingContextProvider";
import PictureModel from "../../models/PictureModel";
import LaptopModel from "../../models/LaptopModel";
import { takeAllPictureOfOneLaptop } from "../../api/PictureAPI";
import { formatNumber } from "../utils/FormatNumber";
import { Link } from "react-router-dom";

export const Cart = () => {

    const { increaseQty, decreaseQty, removeCartItem, cartItems, totalPrice, clearCart, cartQty } = useShoppingContext();
    let [pictureLaptop, setPictureLaptop] = useState<LaptopModel[]>([])

    return (
        <div className="background-color-main">
            <div className="cart-mk marginTop80px">
                <div className="container">
                    <div className="moveY-80px">
                        <div className="LaptopDetails-content-directory-tree">
                            <p><Link to="/"> <i className="fa-solid fa-house"></i>   </Link>   </p>
                            <p> <i className="fa-solid fa-angle-right">   </i>   </p>
                            <p><a href="#">Giỏ hàng</a> </p>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="cart-border">
                        <div className="cart-top">
                            <div className="cart-top-container">
                                <div className="cart-top-wrap">
                                    <div className="cart-top-wrap-item cart-top-wrap-item-active">

                                    </div>
                                    <div className="cart-top-wrap-item ">

                                    </div>
                                    <div className="cart-top-wrap-item">

                                    </div>
                                    <div className="cart-top-wrap-item">

                                    </div>
                                </div>
                                

                                <div className="cart-top-text">
                                    <div className="cart-top-text-item">
                                        <p>Giỏ hàng</p>
                                    </div>
                                    <div className="cart-top-text-item ">
                                        <p>Đặt hàng</p>
                                    </div>
                                    <div className="cart-top-text-item">
                                        <p>Thanh toán</p>
                                    </div>
                                    <div className="cart-top-text-item">
                                        <p>Hoàn thành</p>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>

                </div>
                <div className="container">
                    <div className="cart-border-bottom">
                        <div className="cart-content">
                            <div className="cart-content-left-border">
                                <div className="cart-content-left">
                                    <h4>Giỏ hàng của bạn <span>{cartQty} sản phẩm </span></h4>
                                    <table>
                                        <thead>
                                            <tr className="cart-content-left-textHeader">
                                                <th rowSpan={2}>TÊN SẢN PHẨM</th>
                                                <th></th>
                                                <th>ĐƠN GIÁ</th>
                                                <th>SỐ LƯỢNG</th>
                                                <th>THÀNH TIỀN</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cartItems.map(item => {
                                                return (
                                                    <tr className="cart-content-left-laptopItem">
                                                        <td> <img src={`${item.produceThumbnail ? item.produceThumbnail.getPictureData() : ''}`} alt="" /></td>
                                                        <td><p> {item.produceName}</p></td>
                                                        <td><p>{formatNumber(item.produceSellingPrice)} <sup>đ</sup></p></td>
                                                        <td>
                                                            <button type="button" onClick={() => decreaseQty(item.produceID)}> -</button>
                                                            <button type="button" > {item.produceQty}</button>
                                                            <button type="button" onClick={() => increaseQty(item.produceID)}  >+</button></td>
                                                        <td>
                                                            <p>
                                                                {formatNumber(item.produceQty * item.produceSellingPrice)} <sup>đ</sup>
                                                            </p>
                                                        </td>
                                                        <td><button type="button" onClick={() => removeCartItem(item.produceID)}><i className="fa-regular fa-trash-can"></i></button></td>

                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>

                                </div>
                            </div>
                            <div className="cart-content-right-border">
                                <div className="cart-content-right">
                                    <table className="cart-content-right-table">
                                        <tr>
                                            <th colSpan={2}>Tổng tiền giỏ hàng</th>
                                            <th></th>
                                        </tr>
                                        <tr>
                                            <td>Tổng sản phẩm</td>
                                            <td>{cartQty}</td>
                                        </tr>
                                        <tr>
                                            <td>Tổng tạm tính</td>
                                            <td>{formatNumber(totalPrice)} <sup>đ</sup></td>
                                        </tr>
                                        <tr>
                                            <td>Thành tiền</td>
                                            <td>{formatNumber(totalPrice)} <sup>đ</sup></td>
                                        </tr>
                                    </table>
                                </div>
                                <div className="cart-content-right-bottom">
                                    <div className="cart-content-right-bottom-button">
                                        <Link to="/order"><button>Đặt hàng</button></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        </div >
    )

}