import { log } from "console";
import React, { ChangeEvent, useState } from "react";
import { NavLink } from "react-router-dom";
import { useShoppingContext } from "../../contexts/ShoppingContextProvider";

interface NavBarProps {
  keyWordFindLaptops: string;
  setKeyWordFindLaptops: (keyWord: string) => void;
}


function Navbar({ keyWordFindLaptops, setKeyWordFindLaptops }: NavBarProps) {

  const {cartQty} = useShoppingContext();
  const [tempKeyWordFindLaptops, setTempKeyWordFindLaptop] = useState('');

  const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTempKeyWordFindLaptop(e.target.value);

  }
  const handleSearch = () => {

    setKeyWordFindLaptops(tempKeyWordFindLaptops);

  }

  return (
    // .navbar-expand{-sm|-md|-lg|-xl} for responsive collapsing and color scheme classes.
    <section className="Navbar">
      {/*  NAV */}
      <nav className="container" >

        <div className="nav-content">
          {/* LOGO */}
          <div className="nav-left-logo">
            <NavLink className="navbar-brand nav-link active" aria-current="page" to="/">
              <img src={require('./../../images/MK.jpg')} alt="logo" /></NavLink>
          </div>
          {/* FIND PRODCUT */}
          <div className="nav-left-find-product">

            <div className="nav-left-find-prodcut-input">
              <input type="search" placeholder="Tên sản phẩm, hãng, nhu cầu" aria-label="Search"
                onChange={onSearchInputChange} value={tempKeyWordFindLaptops} />
            </div>
            <div className="nav-left-find-prodcut-input-bottom">
              <button type="submit" onClick={handleSearch}>  <i className="fa-solid fa-magnifying-glass"></i> </button>
            </div>
          </div>
          <div className="nav-right">

            <div className="nav-right-contact">
              <NavLink to="#">
                <i className="fa-solid fa-phone"></i><p>0349.575.601</p></NavLink>
            </div>

            <div className="nav-right-address">
              <NavLink to="#">
                <i className="fa-solid fa-location-dot"></i><p>Địa chỉ cửa hàng</p>
              </NavLink>
            </div>

            <div className="nav-right-login">
              <NavLink className="nav-link" to="/login">
                <i className="fas fa-user fa-xl"></i><p>Đăng nhập</p>
              </NavLink>
            </div>

            <div> <NavLink className="nav-link" to="/register">
              <i className="fas fa-user fa-xl"></i><p> Đăng ký</p>
            </NavLink></div>

            <div className="nav-right-cart">
              <NavLink to="/cart">
              <i className="fa-solid fa-cart-shopping"></i>
              </NavLink>
              {cartQty?<p>{cartQty}</p>:""}
              
            </div>
          </div>

        </div>

      </nav>

    </section>

  );
}

export default Navbar;