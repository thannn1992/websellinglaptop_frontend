import { log } from "console";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useShoppingContext } from "../../contexts/ShoppingContextProvider";
import { formatNumber } from "../utils/FormatNumber";
import { takeAllModelofABrand } from "../../api/ModelAPI";
import ModelModel from "../../models/ModelModel";
import BrandModel from "../../models/BrandModel";
import { takeAllBrand } from "../../api/BrandAPI";
import { LaptopModelNameProp } from "./component/LaptopModelNameProp";
import useInformDialogContext from "../../contexts/InformContextProvider";
import { TakeInforJWT } from "../user/TakeInforJWT";

interface NavBarProps {
  setKeyWordFindLaptops: (keyWord: string) => void;
}

function Navbar({ setKeyWordFindLaptops }: NavBarProps) {
  const { isShowNotification } = useInformDialogContext();

  const [topPosition, setTopPosition] = useState<number>(70);
  const [tempKeyWordFindLaptops, setTempKeyWordFindLaptop] = useState('');
  const [firstDivWidth, setFirstDivWidth] = useState<number>(0);
  const laptopDetailsRef = useRef<HTMLDListElement | null>(null);
  const [listBrand, setListBrand] = useState<BrandModel[]>([]);
  const { increaseQty, decreaseQty, removeCartItem, cartItems, totalPrice, clearCart, cartQty } = useShoppingContext();
  const [informError, setInformError] = useState(null);
  const [positionShowButton, setPositionShowButton] = useState<number>(0);
  const [isToken, setIsToken] = useState<boolean>(false);

  const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTempKeyWordFindLaptop(e.target.value);
  }
  const handleSearch = () => {
    setKeyWordFindLaptops(tempKeyWordFindLaptops);
  }

  const handleScrolltoTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  useEffect(() => {
    takeAllBrand().then(
      brandData => {
        setListBrand(brandData);
      }

    ).catch(
      error => {
        setInformError(error.message);
      }
    );

  }, [])
  useEffect(() => {
    const handleScroll = () => {
      if (laptopDetailsRef.current) {
        const laptopDetailsTop = laptopDetailsRef.current.getBoundingClientRect().top;
        if (laptopDetailsTop < -70) {
          setTopPosition(0);
        } else {
          setTopPosition(172);
        }
      }
      if (window.scrollY > 500) {
        setPositionShowButton(1);
      } else {
        setPositionShowButton(0);
      }
    }
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
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

  useEffect(() => {

    if (localStorage.getItem('token') != null) {
      setIsToken(true);
    };
  }, [isToken]);


  return (
    // .navbar-expand{-sm|-md|-lg|-xl} for responsive collapsing and color scheme classes.
    <section className="Navbar" ref={laptopDetailsRef as React.RefObject<HTMLDivElement>}>
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
                <Link to={tempKeyWordFindLaptops === "" ? "#" : "/find-laptop"} >
                  <button type="submit" onClick={handleSearch}>  <i className="fa-solid fa-magnifying-glass"></i> </button>
                </Link>
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
                <NavLink to="/address">
                  <i className="fa-solid fa-location-dot"><p>Địa chỉ cửa hàng</p></i>
                </NavLink>
              </div>
              <div className="nav-right-item"> <NavLink className="" to="/warranties/policy">
                <i className="fa-solid fa-headset"><p>Bảo hành </p></i>
              </NavLink></div>
              
              {isToken ? (<TakeInforJWT />) : (
                <div className="nav-right-account">
                  <NavLink className="" to="/login">
                    <i className="fas fa-user fa-xl"> <p>Tài khoản</p></i>
                  </NavLink>

                  <div className="nav-right-account-option">
                    <div className="nav-right-account-option-button1">
                      <Link to="/login"><button>Đăng nhập</button></Link>
                    </div>
                    <div className="nav-right-account-option-button2">
                      <Link to="/register"><button>Đăng ký</button></Link>
                    </div>
                  </div>
                </div>
              )}

              <div className="nav-right-cart">
                <NavLink to="/cart">
                  <i className="fa-solid fa-cart-shopping"></i>
                </NavLink>
                {cartQty ? <p>{cartQty}</p> : ""}

                {cartQty ? (
                  <div className="nav-right-cart-temp">
                    <table className="">
                      <tbody >
                        {cartItems.map(item => {
                          return (
                            <React.Fragment key={item.getProduceID()}>
                              <tr className="cart-content-left-laptopItem-small1">
                                <td rowSpan={2}> <img src={`${item.getProduceThumbnail() ? item.getProduceThumbnail().getPictureData() : ''}`} alt="" /></td>
                                <td colSpan={5}><p className="handel-text-two-line" > {item.getProduceName()}</p></td>
                              </tr>
                              <tr className="cart-content-left-laptopItem-small2">
                                <td colSpan={3}><p>
                                  {formatNumber(item.getProduceQty() * item.getProduceSellingPrice())} <sup>đ</sup>
                                </p></td>
                                <td colSpan={2}>
                                  <button type="button" onClick={() => decreaseQty(item.getProduceID())}> -</button>
                                  <button type="button" > {item.getProduceQty()}</button>
                                  <button type="button" onClick={() => increaseQty(item.getProduceID())}  >+</button>
                                </td>
                              </tr>
                            </React.Fragment>
                          )
                        })}
                      </tbody>
                    </table>
                    <div className="nav-right-cart-temp-total">
                      <td>Thành tiền: </td>
                      <td>{formatNumber(totalPrice)} <sup>đ</sup></td>
                    </div>
                    <div className="nav-right-cart-temp-total-button">
                      <Link to="/cart"><button>Xem giỏ hàng</button></Link>
                    </div>
                  </div>
                ) : (<div>
                  <div className="nav-right-cart-temp">
                    <div className="nav-right-cart-temp-empty">
                      <img alt="" src={require('./../../images/cart/empty_cart.jpg')} />
                      <p>Giỏ hàng của bạn đang trống</p>
                    </div>
                    <div className="nav-right-cart-temp-total-button">
                      <Link to="/"><button>Tiếp tục mua hàng</button></Link>
                    </div>
                  </div>
                </div>)}
              </div>
            </div>
          </div>
        </div>
        <div className={`Narvar_border2 ${topPosition === 0 ? "top-0" : 'top-70'} `} style={{ maxWidth: firstDivWidth }}>
          <div className="Narbar02 "  >
            <ul>
              <li>
                <Link to="/1"><img src={require("../../images/iconsBrand/Dell.webp")} alt="Dell" /></Link>
                {listBrand[0] && (
                  <ul key={listBrand[0].getbrandID()}>
                    <LaptopModelNameProp brandID={listBrand[0].getbrandID()} />
                  </ul>
                )}
              </li>
              <li>
                <Link to="/2"><img src={require("../../images/iconsBrand/Lenovo.webp")} alt="Lenovo" /></Link>
                {listBrand[1] && (
                  <ul key={listBrand[1].getbrandID()}>
                    <LaptopModelNameProp brandID={listBrand[1].getbrandID()} />
                  </ul>
                )}
              </li>
              <li>
                <Link to="/3"><img src={require("../../images/iconsBrand/LG.webp")} alt="LG" /></Link>
                {listBrand[2] && (
                  <ul key={listBrand[2].getbrandID()}>
                    <LaptopModelNameProp brandID={listBrand[2].getbrandID()} />
                  </ul>
                )}</li>
              <li> <Link to="/4"><img src={require("../../images/iconsBrand/Microsoft_surface.webp")} alt="Microsoft" /></Link>
                {listBrand[3] && (
                  <ul key={listBrand[3].getbrandID()}>
                    <LaptopModelNameProp brandID={listBrand[3].getbrandID()} />
                  </ul>
                )}
              </li>
              <li> <Link to="/5"><img src={require("../../images/iconsBrand/Asus.webp")} alt="Asus" /></Link>
                {listBrand[4] && (
                  <ul key={listBrand[4].getbrandID()}>
                    <LaptopModelNameProp brandID={listBrand[4].getbrandID()} />
                  </ul>
                )}
              </li>
              <li> <Link to="/6"><img src={require("../../images/iconsBrand/MSI-1.webp")} alt="GIGABYTE" /></Link>
                {listBrand[5] && (
                  <ul key={listBrand[5].getbrandID()}>
                    <LaptopModelNameProp brandID={listBrand[5].getbrandID()} />
                  </ul>
                )}
              </li>
              <li> <Link to="/7"><img src={require("../../images/iconsBrand/HP.webp")} alt="HP" /></Link>
                {listBrand[6] && (
                  <ul key={listBrand[6].getbrandID()}>
                    <LaptopModelNameProp brandID={listBrand[6].getbrandID()} />
                  </ul>
                )}
              </li>
              <li> <Link to="/8"><img src={require("../../images/iconsBrand/macbook.webp")} alt="Apple" /></Link>
                {listBrand[7] && (
                  <ul key={listBrand[7].getbrandID()}>
                    <LaptopModelNameProp brandID={listBrand[7].getbrandID()} />
                  </ul>
                )}
              </li>
              <li> <Link to="/9"><img src={require("../../images/iconsBrand/acer.webp")} alt="Acer" /></Link>
                {listBrand[8] && (
                  <ul key={listBrand[8].getbrandID()}>
                    <LaptopModelNameProp brandID={listBrand[8].getbrandID()} />
                  </ul>
                )}
              </li>
              <li> <Link to="/10"><img src={require("../../images/iconsBrand/MSI.webp")} alt="MSI" /></Link>
                {listBrand[9] && (
                  <ul key={listBrand[9].getbrandID()}>
                    <LaptopModelNameProp brandID={listBrand[9].getbrandID()} />
                  </ul>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container">
        <div className={`ButtonComeBackTop ${positionShowButton === 1 ? 'positionShowButton' : ''}`}>
          <div className="ButtonComeBackTop_button">

            <button onClick={handleScrolltoTop}> <i className="fa-solid fa-arrow-up"></i> </button>
          </div>
        </div>
      </div>
      {isShowNotification ? (
        <div className="ShowNotification">
          <div className="ShowNotification_border">
          </div>
          <div className="ShowNotification_containt">
            <i className="bi bi-bag-check"></i>
            <h4>Thêm vào giỏ hàng thành công!</h4>
          </div>
        </div>
      ) : ""}


    </section>

  );
}

export default Navbar;