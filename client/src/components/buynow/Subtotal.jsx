import React, { useEffect, useState } from 'react'

const Subtotal = ({cartdata}) => {

  const [price,setprice] = useState(0);

  useEffect(()=>{
    const totalAmount = ()=>{
      let price = cartdata.reduce((total,item)=>total+item.price.cost,0);
      setprice(price );
    }
    totalAmount();
  },[])
  return (
    <div className='sub_item'>
        <h3>Subtotal ({cartdata.length} items): <strong style={{fontWeight:700, color:"#111"}}>₹{price}</strong></h3>
    </div>
  )
}

export default Subtotal