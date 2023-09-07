import React, { useEffect, useState } from 'react'

const Right = ({cartdata}) => {
  const [price,setprice] = useState(0);

  useEffect(()=>{
    const totalAmount = ()=>{
      let price = cartdata.reduce((total,item)=>total+item.price.cost,0);
      setprice(price );
    }
    totalAmount();
  },[])
  return (
    <div className='right_buy'>
        <img src="https://images-eu.ssl-images-amazon.com/images/G/31/checkout/assets/TM_desktop._CB443006202_.png" alt="" />
        <div className="cost_right">
            <p>Your Order is eligible for Free Delivery. <br />
            <span style={{color:"#565959"}}>Select this option at checkout. Details</span> </p>
            <h3>Subtotal ({cartdata.length} items): <span style={{fontWeight:700}}>₹{price}</span></h3>
            <button className='rightbuy_btn'>Process to Buy</button>
            <div className='emi'>
                Emi available
            </div>

        </div>
    </div>
  )
}

export default Right