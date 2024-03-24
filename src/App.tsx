import React, { useState } from 'react';
import logo from './logo.svg';
import './Style.css';

import Navbar from './layouts/header-footer/Navbar';

import HomePage from './layouts/homepage/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './layouts/about/About';
import { LaptopDetails } from './layouts/product/LaptopDetails';
import { RegisterUser } from './layouts/user/RegisterUser';
import { ActivateAccount } from './layouts/user/ActiveAccount';
import Login from './layouts/user/Login';
import { InformError403 } from './layouts/inform-error/InformError403';
import LaptopAddingForm_Admin from './layouts/admin/LaptopAddingForm';
import { Footer } from './layouts/header-footer/Footer';
import { Cart } from './layouts/buyproduct/Cart';
import { ShoppingContextProvider } from './contexts/ShoppingContextProvider';
import PictureModel from './models/PictureModel';
import { Order } from './layouts/buyproduct/Order';

function App() {

  const [keyWordFindLaptops, setKeyWordFindLaptops] = useState('');

  return (
    <div className='Style' >
      <ShoppingContextProvider>
        <BrowserRouter>
          <Navbar keyWordFindLaptops={keyWordFindLaptops} setKeyWordFindLaptops={setKeyWordFindLaptops} />
          <Routes>

            <Route path='/' element={<HomePage keyWordFindLaptops={keyWordFindLaptops} />} />
            {/*:brandID  tạo ra parammeter sau đó qua HomePage dùng 
          const{brandID} = useParams() để lấy được giá trị của brandID
          LƯU Ý: Tên sau dấu : phải tương đồng không là không lấy được*/}
            <Route path='/:brandID' element={<HomePage keyWordFindLaptops={keyWordFindLaptops} />} />
            <Route path='/about' element={<About />} />
            <Route path='/laptop/:laptopID' element={<LaptopDetails />} />
            <Route path='/register' element={<RegisterUser />} />
            <Route path='/active/:email/:activecode' element={<ActivateAccount />} />
            <Route path='/login' element={<Login />} />
            <Route path='/admin/addbooks' element={<LaptopAddingForm_Admin />} />
            <Route path='/inform-error-403' element={<InformError403 />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/order' element={<Order/>}/>
          </Routes>

          <Footer />
        </BrowserRouter>
      </ShoppingContextProvider>
    </div>


  );
}

export default App;
