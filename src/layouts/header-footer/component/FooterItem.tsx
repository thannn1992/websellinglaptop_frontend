import React from "react";
import { Link } from "react-router-dom";

function FooterItem() {
    return (
        <div className="FooterItem">
            <div className="container">
                <footer className=" FooterItem-container">
                    <div className="FooterItem-container-items">

                        <div className="FooterItem-container-item ">
                            <div className=" FooterItem-container-item-h">
                                <h5>VỀ CHÚNG TÔI</h5>
                                <div className=" FooterItem-container-item-h-border">
                                </div>
                            </div>

                            <ul className="nav flex-column">
                                <li className=" mb-2"><Link to="/">Trang chủ</Link></li>
                                <li className=" mb-2"><Link to="/about" >Giới thiệu</Link></li>
                                <li className=" mb-2"><Link to="#" >Sản phẩm</Link></li>
                                <li className=" mb-2"><Link to="/address" >Liên hệ</Link></li>
                            </ul>
                        </div>

                        <div className="FooterItem-container-item">
                            <div className=" FooterItem-container-item-h">
                                <h5>HỖ TRỢ KHÁCH HÀNG</h5>
                                <div className=" FooterItem-container-item-h-border">
                                </div>
                            </div>
                            <ul className="nav flex-column">
                                <li className=" mb-2"><Link to="#" >Hướng dẫn mua hàng trực tuyến</Link></li>
                                <li className=" mb-2"><Link to="#" >Hướng dẫn thanh toán</Link></li>
                                <li className=" mb-2"><Link to="#" >Hướng dẫn mua hàng trả góp</Link></li>
                                <li className=" mb-2"><Link to="#" >In hóa đơn điện tử</Link></li>
                                <li className=" mb-2"><Link to="#" >Tra cứu bảo hành</Link></li>
                            </ul>
                        </div>

                        <div className="FooterItem-container-item ">
                            <div className=" FooterItem-container-item-h">
                                <h5>CHÍNH SÁCH CHUNG</h5>
                                <div className=" FooterItem-container-item-h-border">
                                </div>
                            </div>
                            <ul className="nav flex-column">
                                <li className=" mb-2"><Link to="#" >Chính sách vận chuyển</Link></li>
                                <li className=" mb-2"><Link to="#" >Chính sách bảo hành</Link></li>
                                <li className=" mb-2"><Link to="#" >Chính sách kiểm hàng</Link></li>
                                <li className=" mb-2"><Link to="#" >Chính sách đổi trả</Link></li>
                                <li className=" mb-2"><Link to="#" >Bảo mật thông tin khách hàng</Link></li>
                            </ul>
                        </div>

                        <div className="FooterItem-container-item ">
                            <div className="FooterItem-container-item-tt">
                                <div className=" FooterItem-container-item-h">
                                    <h5>PHƯƠNG THỨC THANH TOÁN</h5>
                                    <div className=" FooterItem-container-item-h-border">
                                    </div>
                                </div>
                                <div className="FooterItem-container-item-payment">
                                    <div className="FooterItem-container-item-payment-img">
                                        <ul className="">
                                            <li className=""><img src={require('./../../../images/payment/visa.png')} alt="" /></li>
                                            <li className=""><img src={require('./../../../images/payment/mastercard.png')} alt="" /></li>
                                            <li className=""><img src={require('./../../../images/payment/the atm.png')} alt="" /></li>
                                            <li className=""><img src={require('./../../../images/payment/chuyen khoan.png')} alt="" /></li>
                                            <li className=""><img src={require('./../../../images/payment/tiem mat.png')} alt="" /></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="FooterItem-container-item-sub">
                                <form>
                                    <div className=" FooterItem-container-item-h">
                                        <h5>ĐĂNG KÝ NHẬN TIN KHUYẾN MÃI</h5>
                                        <div className=" FooterItem-container-item-h-border">
                                        </div>
                                    </div>
                                    <div className="FooterItem-container-item-email  d-flex ">
                                        <input id="" type="email" className="" placeholder="Email.." />
                                        <button  type="button">Đăng ký</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className=" FooterItem-container-bottom d-flex border-top">
                        <p>&copy; MK Company, Inc. All rights reserved.</p>
                       
                    </div>
                </footer>
            </div>
        </div>
    )
}
export default FooterItem;