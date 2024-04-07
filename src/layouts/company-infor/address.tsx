import React from "react";

export const Address = () => {
    return (
        <div className="Address_background background-color-main ">
            <div className="container">
                <div className="Address_container">
                    <div className="Address_container_left">
                        <div className="Address-container_left_border">
                            <div className="Address_container_left_infor">
                                <ul>
                                    <li>
                                        <i className="fa-solid fa-location-dot "><div className="Address_container_left_infor_circle"></div></i><p>Đinh Văn Thị, Làng Chre, K'Bang, Gia Lai</p>
                                    </li>
                                    <li>
                                        <i className="fa-solid fa-mobile-screen-button "><div className="Address_container_left_infor_circle"></div></i> <p>0349 575 601</p>
                                    </li>
                                    <li>
                                        <i className="fa-regular fa-envelope"><div className="Address_container_left_infor_circle1"></div></i> <p>nguyennhamthan1010@gmail.com</p>
                                    </li>
                                </ul>
                            </div>
                            <div className="Address_container_left_contact">
                                <form>
                                    <h4>Thông tin liên hệ: </h4>
                                    <div className="Address_container_left_contact_form">

                                        <input
                                            type="text"
                                            id="firstName"
                                            className=""
                                            placeholder="Họ và tên..."
                                        />
                                    </div>
                                    <div className="Address_container_left_contact_form">

                                        <input
                                            type="text"
                                            id="email"
                                            className=""
                                            placeholder="Email..."
                                        />
                                    </div>
                                    <div className="Address_container_left_contact_form">

                                        {/* <textarea></textarea> Không được phép có khoảng trắng không bị lỗi không hiện placeholder*/}
                                        <textarea id="content" className="" placeholder="Nội dung" rows={4} cols={50}></textarea>
                                    </div>
                                    <button className="Address_container_left_contact_form_button">Gửi liên hệ</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="Address_container_right">
                            <div className="Address-container_right_border">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3348.424212992405!2d108.63763538199453!3d14.158949616104385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x316ed111b3c414b3%3A0xb6f10215263731fd!2zVGjDoWMgRMahaSBLYmFuZw!5e0!3m2!1sen!2s!4v1712458290854!5m2!1sen!2s" width="600" height="450" style={{ border: '0' }} loading="lazy"></iframe>
                            </div>
                    </div>

                </div>
            </div>
        </div>


    )

}