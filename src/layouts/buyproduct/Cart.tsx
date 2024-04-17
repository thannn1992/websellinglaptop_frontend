import React, { useEffect, useState } from "react";
import { useShoppingContext } from "../../contexts/ShoppingContextProvider";
import PictureModel from "../../models/PictureModel";
import LaptopModel from "../../models/LaptopModel";
import { takeAllPictureOfOneLaptop } from "../../api/PictureAPI";
import { formatNumber } from "../utils/FormatNumber";
import { Link } from "react-router-dom";
import useConfirmDialogContext from "../../contexts/ConfirmContextProvider";

export const Cart = () => {

    const { increaseQty, decreaseQty, removeCartItem, cartItems, totalPrice, clearCart, cartQty } = useShoppingContext();
    let [pictureLaptop, setPictureLaptop] = useState<LaptopModel[]>([]);
    const { handleShowNotification, isShowNotification,ProduceID, handleCloseNotification, handleUpdateProduceID } = useConfirmDialogContext();

    const [isSmallerSize, setIsSamllerSize] = useState<boolean>();

    useEffect(() => {
        const handelResize = () => {
            if (window.innerWidth <= 740) {
                setIsSamllerSize(true);
            } else {
                setIsSamllerSize(false);
            }
        };
        handelResize(); // Check initial size

        window.addEventListener('resize', handelResize);
        return () => {
            window.removeEventListener('resize', handelResize);
        };

    }, []);


    return (
        <div className="background-color-main">
            <div className="cart-mk">
                <div className="container">
                    <div className="">
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
                    {cartQty ? (
                        <div className="cart-border-bottom">
                            <div className="cart-content">
                                <div className="cart-content-left-border">
                                    <div className="cart-content-left">

                                        {isShowNotification ? (
                                            <div className="ShowNotification">
                                                <div className="ShowNotification_border">
                                                </div>
                                                <div className="ShowNotification_containt_confirm">
                                                    <h4>Thông báo</h4>
                                                    <h5>Bạn muốn xóa sản phẩm này khỏi giỏ hàng?</h5>
                                                    <div className="ShowNotification_containt_confirm_button">
                                                        <button onClick={() => handleCloseNotification()}> Hủy bỏ</button>
                                                        <button  onClick={() => {removeCartItem(ProduceID); handleCloseNotification()} }>Đồng ý</button>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : ""}

                                        <h4>Giỏ hàng của bạn <span>{cartQty} sản phẩm </span></h4>
                                        {isSmallerSize ? (
                                            <table className="">
                                                <tbody >
                                                    {cartItems.map(item => {
                                                        return (
                                                            <React.Fragment key={item.produceID}>
                                                                <tr className="cart-content-left-laptopItem-small1">
                                                                    <td rowSpan={2}> <img src={`${item.produceThumbnail ? item.produceThumbnail.getPictureData() : ''}`} alt="" /></td>
                                                                    <td colSpan={4}><p> {item.produceName}</p></td>

                                                                    <td><button type="button" onClick={() => removeCartItem(item.produceID)}><i className="fa-regular fa-trash-can"></i></button></td>
                                                                </tr>
                                                                <tr className="cart-content-left-laptopItem-small2">
                                                                    <td colSpan={3}><p>
                                                                        {formatNumber(item.produceQty * item.produceSellingPrice)} <sup>đ</sup>
                                                                    </p></td>

                                                                    <td colSpan={2}>
                                                                        <button type="button" onClick={() => decreaseQty(item.produceID)}> -</button>
                                                                        <button type="button" > {item.produceQty}</button>
                                                                        <button type="button" onClick={() => increaseQty(item.produceID)}  >+</button>
                                                                    </td>
                                                                </tr>
                                                            </React.Fragment>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                        ) : (
                                            <table className="">
                                                <thead className="">
                                                    <tr className="cart-content-left-textHeader">
                                                        <th rowSpan={2}>TÊN SẢN PHẨM</th>
                                                        <th></th>
                                                        <th>ĐƠN GIÁ</th>
                                                        <th>SỐ LƯỢNG</th>
                                                        <th>THÀNH TIỀN</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody >
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
                                                                <td><button type="button" onClick={() => {handleShowNotification(); handleUpdateProduceID(item.produceID)}}>
                                                                    <i className="fa-regular fa-trash-can"></i></button></td>
                                                                {/* <td><button type="button" onClick={() => removeCartItem(item.produceID)}>
                                                                <i className="fa-regular fa-trash-can"></i></button></td> */}
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                        )}
                                    </div>
                                </div>

                                <div className="cart-content-right-border">
                                    <div className="cart-content-right-content">
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
                        </div>
                    ) : (
                        <div className="cart-content-empty">
                            <div className="cart-content-empty-content">
                                <div className="cart-content-empty-content-picture">
                                    <img alt="" src={require('./../../images/cart/empty_cart.jpg')} />
                                    <p>Giỏ hàng của bạn đang trống</p>
                                </div>
                                <div className="cart-content-empty-content-button">
                                    <Link to="/"><button>Tiếp tục mua hàng</button></Link>
                                </div>
                            </div>
                        </div>
                    )}

                </div >
            </div >
        </div >
    )

}