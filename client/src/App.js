import { Routes, Route } from 'react-router-dom';
import './App.css';

import Navbaar from './components/header/navbaar';
import Newnav from './components/newnavbaar/Newnav';
import Maincomp from './components/home/Maincomp'
import Footer from './components/footer/Footer';
import SignIn from "./components/signup_sign/Sign_in";
import SignUp from './components/signup_sign/Sign_Up';
import Cart from './components/cart/cart';
import Buynow from "./components/buynow/Buynow";
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from 'react';
import { dividerClasses } from '@mui/material';

function App() {

  const [data, setData] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setData(true);
    }, 2000)
  }, [])
  return (
    <>
      {
        data ? (
          <>
            <Navbaar />
            <Newnav />
            <Routes>
              <Route path='/' element={<Maincomp />} />
              <Route path='/login' element={<SignIn />} />
              <Route path='/register' element={<SignUp />} />
              <Route path='/getproductsone/:id' element={<Cart />} />
              <Route path='/buynow' element={<Buynow />} />

            </Routes>
            <Footer />
          </>
        ):(
          <div className='circle'>
            <CircularProgress />
            <h2>Loading...</h2>
          </div>
        )
    }

    </>
  );
}

export default App;
