import React from "react";

function FooterItem() {
    return (
        <div className="FooterItem">
            <div className="container">
                <footer className=" FooterItem-container">
                    <div className="FooterItem-container-items row">
                        <div className="FooterItem-container-item col-6 col-md-2 mb-3">
                            <div className=" FooterItem-container-item-h">
                                <h5>VỀ CHÚNG TÔI</h5>
                                <div className=" FooterItem-container-item-h-border">
                                </div>
                            </div>

                            <ul className="nav flex-column">
                                <li className=" mb-2"><a href="#" className="">Trang chủ</a></li>
                                <li className=" mb-2"><a href="#" >Giới thiệu</a></li>
                                <li className=" mb-2"><a href="#" >Sản phẩm</a></li>
                                <li className=" mb-2"><a href="#" >Liên hệ</a></li>
                            </ul>
                        </div>

                        <div className="FooterItem-container-item col-6 col-md-2 mb-3">
                            <div className=" FooterItem-container-item-h">
                                <h5>HỖ TRỢ KHÁCH HÀNG</h5>
                                <div className=" FooterItem-container-item-h-border">
                                </div>
                            </div>
                            <ul className="nav flex-column">
                                <li className=" mb-2"><a href="#" >Hướng dẫn mua hàng trực tuyến</a></li>
                                <li className=" mb-2"><a href="#" >Hướng dẫn thanh toán</a></li>
                                <li className=" mb-2"><a href="#" >Hướng dẫn mua hàng trả góp</a></li>
                                <li className=" mb-2"><a href="#" >In hóa đơn điện tử</a></li>
                                <li className=" mb-2"><a href="#" >Tra cứu bảo hành</a></li>
                            </ul>
                        </div>

                        <div className="FooterItem-container-item col-6 col-md-2 mb-3">
                            <div className=" FooterItem-container-item-h">
                                <h5>CHÍNH SÁCH CHUNG</h5>
                                <div className=" FooterItem-container-item-h-border">
                                </div>
                            </div>
                            <ul className="nav flex-column">
                                <li className=" mb-2"><a href="#" >Chính sách vận chuyển</a></li>
                                <li className=" mb-2"><a href="#" >Chính sách bảo hành</a></li>
                                <li className=" mb-2"><a href="#" >Chính sách kiểm hàng</a></li>
                                <li className=" mb-2"><a href="#" >Chính sách đổi trả</a></li>
                                <li className=" mb-2"><a href="#" >Bảo mật thông tin khách hàng</a></li>
                            </ul>
                        </div>

                        <div className="FooterItem-container-item col-md-6 mb-3">
                            <div className="FooterItem-container-item-tt">
                                <div className=" FooterItem-container-item-h">
                                    <h5>PHƯƠNG THỨC THANH TOÁN</h5>
                                    <div className=" FooterItem-container-item-h-border">
                                    </div>
                                </div>
                                <div className="FooterItem-container-item-payment">
                                    <div className="FooterItem-container-item-payment-img">
                                        <ul className="nav row">
                                            <li className="col-md-2"><img src={require('./../../../images/payment/visa.png')} alt="" /></li>
                                            <li className="col-md-2"><img src={require('./../../../images/payment/mastercard.png')} alt="" /></li>
                                            <li className="col-md-2"><img src={require('./../../../images/payment/the atm.png')} alt="" /></li>
                                            <li className="col-md-2"><img src={require('./../../../images/payment/chuyen khoan.png')} alt="" /></li>
                                            <li className="col-md-2"><img src={require('./../../../images/payment/tiem mat.png')} alt="" /></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div>
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

                    <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
                        <p>&copy; 2023 Company, Inc. All rights reserved.</p>
                        <ul className="list-unstyled d-flex">
                            <li className="ms-3"><a className="link-body-emphasis" href="#"> <i className="fa-brands fa-twitter fa-xl"></i></a></li>
                            <li className="ms-3"><a className="link-body-emphasis" href="#"> <i className="fab fa-instagram fa-xl"></i></a></li>
                            <li className="ms-3"><a className="link-body-emphasis" href="#"> <i className="fab fa-facebook-f fa-xl"></i></a></li>
                        </ul>
                    </div>
                </footer>
            </div>
        </div>
    )
}
export default FooterItem;