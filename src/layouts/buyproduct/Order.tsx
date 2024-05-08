import React, { useEffect, useState } from "react";
import { formatNumber } from "../utils/FormatNumber";
import { Link } from "react-router-dom";
import { useShoppingContext } from "../../contexts/ShoppingContextProvider";
import LaptopModel from "../../models/LaptopModel";
import { ShoppingContextProvider } from "../../contexts/ShoppingContextProvider";
import Provinces from "../../models/Provinces";
import Wards from "../../models/Wards";
import Districts from "../../models/Districts";
import { takeAllProvinces } from "../../api/ProvincesAPI";
import { error } from "console";
import { takeAllDistrictOfOneProvince } from "../../api/DistrictsAPI";
import { takeAllWardOfOneDistrict } from "../../api/WardAPI";

export const Order = () => {
    const { increaseQty, decreaseQty, removeCartItem, cartItems, totalPrice, clearCart, cartQty } = useShoppingContext();
    const [selectedGender, setSelectedGender] = useState<string>('Nam');
    const [selectedVAT, setSelectedVAT] = useState<boolean>(false);
    const [checkPayment, setCheckPayment] = useState<string>('Mastercard')
    const [orderButton, setOrderButton] = useState<boolean>(false);
    let [pictureLaptop, setPictureLaptop] = useState<LaptopModel[]>([]);
    const [listProvinces, setListProvinces] = useState<Provinces[]>([]);
    const [provinceID, setProvinceID] = useState<string>('');
    const [listWards, setListWards] = useState<Wards[]>([]);
    const [listDistricts, setListDistricts] = useState<Districts[]>([]);
    const [informError, setInformError] = useState(null);
    useEffect(() => {
        takeAllProvinces().then(
            provincesData => setListProvinces(provincesData)
        ).catch(
            error => {
                setInformError(error.message);
            }
        )
        takeAllDistrictOfOneProvince(provinceID).then(
            districtData => setListDistricts(districtData)
        ).catch(
            error => {
                setInformError(error.message);
            }
        )

    }, []);

    const handleGenderChange = (gender: string) => {
        setSelectedGender(gender);
    };
    const handleProvinceChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedProvinceID = e.target.value;
        setProvinceID(selectedProvinceID);
        takeAllDistrictOfOneProvince(selectedProvinceID).then(
            districtsData => setListDistricts(districtsData)
        ).catch(
            error => {
                setInformError(error.message);
            }
        );
    }
    const handleDistrictChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedDistrictID = e.target.value;
        setProvinceID(selectedDistrictID);
        takeAllWardOfOneDistrict(selectedDistrictID).then(
            wardData => setListWards(wardData)
        ).catch(
            error => {
                setInformError(error.message);
            }
        );
    }

    const handleVATChanged = () => {
        if (selectedVAT === true) {
            setSelectedVAT(false)
        } else {
            setSelectedVAT(true)
        }
    }

    const handlePaymentMethod = (payment: string) => {
        setCheckPayment(payment);
        if (payment === "ByCash") {
            setOrderButton(true);
        } else {
            setOrderButton(false);
        }
    }

    return (
        <div className="background-color-main">
            <div className="cart-mk">
            </div>
            <div className="container">
                <div className="cart-border">
                    <div className="cart-top">
                        <div className="cart-top-container">
                            <div className="cart-top-wrap">
                                <div className="cart-top-wrap-item cart-top-wrap-item-active">
                                </div>
                                <div className="cart-top-wrap-item cart-top-wrap-item-active">
                                </div>
                                <div className="cart-top-wrap-item">
                                </div>
                                <div className="cart-top-wrap-item">
                                </div>
                            </div>
                            <div className="cart-top-wrap-active1 ">
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
                <div className="order">
                    <div className="order-border">
                        <div className="cart-content">
                            <div className="order-content-border">
                                <form action="" method="post" className="cart_form">
                                    <h4>Thông tin khách mua hàng: <span className="requiredInput">*</span></h4>
                                    <div className="order_custom_infor">
                                        <div className="order_custom_infor_gender">
                                            <input className="order_custom_infor_gender_item_1"
                                                type="radio"
                                                id="Nam"
                                                name="Nam"
                                                value="Nam"
                                                checked={selectedGender === 'Nam'}
                                                onChange={() => handleGenderChange('Nam')} />
                                            <label htmlFor="Nam" > Anh</label>
                                            <input className="order_custom_infor_gender_item_2"
                                                type="radio"
                                                id="Nu"
                                                name="Nu"
                                                value="Nu"
                                                checked={selectedGender === "Nu"}
                                                onChange={() => handleGenderChange('Nu')} />
                                            <label htmlFor="Nu" > Chị</label>
                                        </div>
                                        <div className="order_custom_infor_fullname">
                                            <input className="order_custom_infor_fullname_firstname" type="name" name="FullName" id="FullName" placeholder="Nhập họ tên" />
                                            <input type="name" name="PhoneNumber" id="PhoneNumber" placeholder="Nhập số điện thoại" />
                                        </div>

                                    </div>
                                    <br />

                                    <h4>Địa chỉ nhận hàng: <span className="requiredInput">*</span></h4>
                                    <div className="order_custom_infor_address">
                                        <select onChange={(e) => {
                                            handleProvinceChanged(e);
                                        }} >
                                            <option value="province"><span>Chọn Tỉnh, Thành phố</span> </option>
                                            {listProvinces.map((province) => (
                                                <option value={province.getCode()}><span>{province.getName()}</span> </option>
                                            ))
                                            }
                                        </select>


                                        <select onChange={(e) => {
                                            handleDistrictChanged(e);
                                        }}>
                                            <option value="district"><p>Chọn Quận, Huyện</p> </option>
                                            {listDistricts.map((districts) => (
                                                <option value={districts.getCode()} ><span>{districts.getName()}</span> </option>
                                            ))
                                            }
                                        </select>
                                        <select>

                                            <option value="ward"> Chọn Phường, Xã</option>
                                            {listWards.map((ward) => (
                                                <option value={ward.getName()} ><span>{ward.getName()}</span> </option>
                                            ))
                                            }
                                        </select>
                                        <input type="text" placeholder="Số nhà, tên đường" />
                                        <input type="text" placeholder="Lưu ý, yêu cầu khác (Không bắt buộc)" />

                                    </div>
                                    <div className="order_custom_infor_VAT">
                                        <label htmlFor="VAT"><h4>Xuất hóa đơn VAT:</h4> </label>
                                        <input className="custom_checkbox" type="checkbox" value="VAT" id="VAT" name="VAT" onChange={() => handleVATChanged()} />

                                        {selectedVAT && <div className="custom_checkbox_detail">
                                            <input type="text" id="ten_cong_ty" name="ten_cong_ty" placeholder="Tên công ty" />
                                            <input type="text" id="dia_chi_cong_ty" name="dia_chi_cong_ty" placeholder="Địa chỉ công ty" />
                                            <input type="text" id="ma_so_thue" name="ma_so_thue" placeholder="Mã số thuế" />
                                            <input type="text" id="email_cong_ty" name="email_cong_ty" placeholder="Email" />
                                        </div>}
                                    </div>

                                    <div className="order_custom_infor_payment_method">
                                        <h4>Phương thức thanh toán: <span className="requiredInput">*</span></h4>
                                        <div className="order_custom_infor_payment_method_border">
                                            <h5>Mọi giao dịch đều được bảo mật và mã hóa. Thông tin thẻ tín dụng sẽ không bao giờ được lưu lại.</h5>
                                            <div className="order_custom_infor_payment_method_item">
                                                <div className="order_custom_infor_payment_method_item_mastercard ">
                                                    <input type="radio" id="mastercard" name="mastercard" value="mastercard" checked={checkPayment === "Mastercard"} onClick={() => handlePaymentMethod('Mastercard')} />
                                                    <label htmlFor="mastercard">Thanh toán bằng thẻ tín dụng  </label>
                                                </div>
                                                <div className="order_custom_infor_payment_method_item_ATM">
                                                    <input type="radio" id="ATM" name="ATM" value="ATM" checked={checkPayment === "ATM"} onClick={() => handlePaymentMethod('ATM')} />
                                                    <label htmlFor="ATM"> Thanh toán bằng thẻ ATM </label>
                                                </div>
                                                <div className="order_custom_infor_payment_method_item_Momo">
                                                    <input type="radio" id="momo" name="momo" value="momo" checked={checkPayment === "Momo"} onClick={() => handlePaymentMethod('Momo')} />
                                                    <label htmlFor="momo">Thanh toán bằng Momo  </label>
                                                </div>
                                                <div className="order_custom_infor_payment_method_item_bycash">
                                                    <input type="radio" id="bycash" name="bycash" value="bycash" checked={checkPayment === "ByCash"} onClick={() => handlePaymentMethod('ByCash')} />
                                                    <label htmlFor="bycash">Thanh toán khi giao hàng</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="order_payment">
                                        <table className="order-content-right-table">
                                            <tr>
                                                <th colSpan={2}> <h4>Tổng tiền giỏ hàng:</h4></th>
                                                <th></th>
                                            </tr>

                                            <tr>
                                                <td>Tạm tính</td>
                                                <td>{formatNumber(totalPrice)} <sup>đ</sup></td>
                                            </tr>
                                            <tr>
                                                <td>Phí vận chuyển</td>
                                                <td>0 <sup>đ</sup></td>
                                            </tr>
                                            <tr>
                                                <td>Tiền thanh toán</td>
                                                <td>{formatNumber(totalPrice)} <sup>đ</sup></td>
                                            </tr>
                                        </table>
                                    </div>
                                    <div className="cart-content-right-bottom">
                                        <div className="cart-content-right-bottom-button">
                                            {orderButton && <Link to="/order-inform"><button>ĐẶT HÀNG</button></Link>}
                                            {(orderButton == false) && <Link to="/payment"><button>TIẾP TỤC THANH TOÁN</button></Link>}
                                        </div>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >

    )

}