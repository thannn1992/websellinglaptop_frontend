import React from "react";
import { Link } from "react-router-dom";

export const Category: React.FC = () => {
    return (
        <div className="category">
            <div className="category-content">
                    <ul>
                         <h5>Thương hiệu</h5>
                        <li> <Link to="/1"><img src={require("../../../images/iconsBrand/Dell.webp")} alt="Dell" /></Link></li>
                        <li> <Link to="/2"><img src={require("../../../images/iconsBrand/Lenovo.webp")} alt="Lenovo" /></Link></li>
                        <li> <Link to="/3"><img src={require("../../../images/iconsBrand/LG.webp")} alt="LG" /></Link></li>
                        <li> <Link to="/4"><img src={require("../../../images/iconsBrand/Microsoft_surface.webp")} alt="Microsoft" /></Link></li>
                        <li> <Link to="/5"><img src={require("../../../images/iconsBrand/Asus.webp")} alt="Asus" /></Link></li>
                        <li> <Link to="/6"><img src={require("../../../images/iconsBrand/MSI-1.webp")} alt="GIGABYTE" /></Link></li>
                        <li> <Link to="/7"><img src={require("../../../images/iconsBrand/HP.webp")} alt="HP" /></Link></li>
                        <li> <Link to="/8"><img src={require("../../../images/iconsBrand/macbook.webp")} alt="Apple" /></Link></li>
                        <li> <Link to="/9"><img src={require("../../../images/iconsBrand/acer.webp")} alt="Acer" /></Link></li>
                        <li> <Link to="/10"><img src={require("../../../images/iconsBrand/MSI.webp")} alt="MSI" /></Link></li>
                    </ul>
            </div>
        </div>
    )

}