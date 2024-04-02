import { log } from "console";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useShoppingContext } from "../../contexts/ShoppingContextProvider";

interface NavBarProps {
  setKeyWordFindLaptops: (keyWord: string) => void;
}

function Navbar({ setKeyWordFindLaptops }: NavBarProps) {
  const [topPosition, setTopPosition] = useState<number>(70);
  const { cartQty } = useShoppingContext();
  const [tempKeyWordFindLaptops, setTempKeyWordFindLaptop] = useState('');
  const [firstDivWidth, setFirstDivWidth] = useState<number>(0);


  const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTempKeyWordFindLaptop(e.target.value);
  }
  const handleSearch = () => {
    setKeyWordFindLaptops(tempKeyWordFindLaptops);
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setTopPosition(0);
      } else {
        setTopPosition(70);
      }
    }
    // every time scroll the mouse, useEffect will repeat this code, 
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };

  }, []);

  useEffect(() => {
    const handelResize = () => {
      const firstDiv = document.getElementById('firstDiv');
      if (firstDiv) {
        setFirstDivWidth(firstDiv.offsetWidth);
      }
    };
    handelResize();
    window.addEventListener('resize', handelResize);
    return () => {
      window.removeEventListener('resize', handelResize);
    };
  }, [])


  return (
    // .navbar-expand{-sm|-md|-lg|-xl} for responsive collapsing and color scheme classes.
    <section className="Navbar">
      <div className="container">
        <div className="Narvar_border1" id="firstDiv" >
          <div className="Navbar01" >
            {/* LOGO */}
            <div className="nav-left-logo">
              <NavLink className="navbar-brand nav-link active" aria-current="page" to="/">
                <img src={require('./../../images/MK_CHANGE_BACKGROUND.png')} alt="logo" /></NavLink>
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
              <div className="nav-left-find-product-border-left"></div>
            </div>
            <div className="nav_space">

            </div>
            <div className="nav-right">

              <div className="nav-right-item">
                <NavLink to="#">
                  <i className="fa-solid fa-phone"><p>0349.575.601</p></i></NavLink>
              </div>

              <div className="nav-right-item">
                <NavLink to="#">
                  <i className="fa-solid fa-location-dot"><p>Địa chỉ cửa hàng</p></i>
                </NavLink>
              </div>



              <div className="nav-right-item"> <NavLink className="" to="#">
                <i className="fa-solid fa-headset"><p>Bảo hành </p></i>
              </NavLink></div>

              <div className="nav-right-item">
                <NavLink className="" to="/login">
                  <i className="fas fa-user fa-xl"> <p>Đăng nhập</p></i>
                </NavLink>
              </div>

              <div className="nav-right-cart">
                <NavLink to="/cart">
                  <i className="fa-solid fa-cart-shopping"></i>
                </NavLink>
                {cartQty ? <p>{cartQty}</p> : ""}

              </div>
            </div>
          </div>
        </div>
       
          <div className={`Narvar_border2 ${topPosition === 0 ? "top-0" : 'top-70'} `} style={{ maxWidth: firstDivWidth }}>

            <div className="Narbar02 "  >
              <ul>
                <li> <Link to="/1"><img src={require("../../images/iconsBrand/Dell.webp")} alt="Dell" /></Link></li>
                <li> <Link to="/2"><img src={require("../../images/iconsBrand/Lenovo.webp")} alt="Lenovo" /></Link></li>
                <li> <Link to="/3"><img src={require("../../images/iconsBrand/LG.webp")} alt="LG" /></Link></li>
                <li> <Link to="/4"><img src={require("../../images/iconsBrand/Microsoft_surface.webp")} alt="Microsoft" /></Link></li>
                <li> <Link to="/5"><img src={require("../../images/iconsBrand/Asus.webp")} alt="Asus" /></Link></li>
                <li> <Link to="/6"><img src={require("../../images/iconsBrand/MSI-1.webp")} alt="GIGABYTE" /></Link></li>
                <li> <Link to="/7"><img src={require("../../images/iconsBrand/HP.webp")} alt="HP" /></Link></li>
                <li> <Link to="/8"><img src={require("../../images/iconsBrand/macbook.webp")} alt="Apple" /></Link></li>
                <li> <Link to="/9"><img src={require("../../images/iconsBrand/acer.webp")} alt="Acer" /></Link></li>
                <li> <Link to="/10"><img src={require("../../images/iconsBrand/MSI.webp")} alt="MSI" /></Link></li>
              </ul>
            </div>
          
        </div>
      </div>
    </section>

  );
}

export default Navbar;