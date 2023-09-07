import React, { useContext, useEffect, useState } from 'react'
import { Divider } from '@mui/material';
import './cart.css';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginContext } from '../context/ContextProvider';
import CircularProgress from '@mui/material/CircularProgress';


const Cart = () => {

  const { id } = useParams();
  // console.log(id);
  const history = useNavigate();
  const {account,setAccount} = useContext(LoginContext);

  const [indData, setinddata] = useState("");

  const getindata = async () => {
    const res = await fetch(`/getproductsone/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await res.json();
    if (res.status !== 200) {
      console.log("no data");
    }
    else {
      setinddata(data);
      console.log(data);
    }
  }

  useEffect(() => {
    setTimeout(()=>{
      getindata();
    },1000);
  }, [id])

  // add cart function
  const addtocart = async (id) => {
    const checkres = await fetch(`/addcart/${id}`, {
      method: "POST",
      headers: {
        "Context-Type": "application/json"
      },
      body: JSON.stringify({
        indData
      }),
      credentials: "include" // send cookies to backend
    })
  const data1 = await checkres.json();
  console.log("data1",data1);
  if(checkres.status === 400 || !data1){
    toast.warn("invalid user", {
      position: "top-right",
    })
  }else{
    history("/buynow");
    setAccount(data1);
    toast.success("added in your cart", {
      position: "top-right",
    })
    
  }

  }

  return (<div className="cart_section">
    {indData && Object.keys(indData).length > 0 &&
      <div className="cart_container">
        <div className="left_cart">
          <img src={indData.url} alt="cart_img" />
          <div className="cart_btn">
            <button className='cart_btn1' onClick={() => addtocart(id)}>Add to Cart</button>
            <button className='cart_btn2' >Buy Now</button>
          </div>
        </div>
        <div className="right_cart">
          <h3>{indData.title.shortTitle}</h3>
          <h4>{indData.title.longTitle}</h4>
          <Divider />
          <p className='mrp'> M.R.P: ₹{indData.price.mrp}</p>
          <p>Deal of the Day :  <span style={{ color: '#B12704' }}>₹{indData.price.cost}</span></p>
          <p>You save : : <span style={{ color: '#B12704' }}>₹{indData.price.mrp - indData.price.cost}({indData.price.discount})</span></p>
          <div className="discount_box">
            <h5>Discount : <span style={{ color: '#111' }}>{indData.discount}</span></h5>
            <h4>Free Delivery : <span style={{ color: '#111', fontWeight: 600 }}>Oct 8 -21</span>Details</h4>
            <p>Fastest delivery: <span style={{ color: '#111', fontWeight: 600 }}>Tomorrow 11AM</span></p>
          </div>
          <p className='description'>About the item : <span style={{ color: '#565959', fontSize: 14, fontWeight: 500, letterSpacing: "0.4px" }}>{indData.description}</span></p>
        </div>
      </div>
    }
    <ToastContainer />
    {
      !indData ? <div className='circle'>
      <CircularProgress />
      <h2>Loading...</h2>
    </div> : ""
    }
  </div>

  )
}

export default Cart;